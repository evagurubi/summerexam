const Article = require("../services/article.service");
const jwt_decode = require("jwt-decode");

exports.list = (req, res) => {
  Article.list().then((result) => {
    let returnArray = [];
    let myItem = {};
    result.map((item) => {
      myItem = { title: item.title, content: item.content };
      returnArray = [...returnArray, myItem];
    });
    res.json(returnArray);
  });
};

exports.listall = (req, res) => {
  let keyword = null;
  let content = null;
  if (req.query) {
    console.log(req.query);
    if (req.query.keyword) {
      keyword = req.query.keyword;
    }
    if (req.query.content) {
      content = req.query.content;
    }
  }

  Article.list(keyword, content).then((result) => res.json(result));
};

exports.insert = (req, res) => {
  const decoded = jwt_decode(req.header("auth-token"));
  //console.log(decoded);
  Article.createArticle(req.body, decoded.id).then((result) =>
    res.status(201).send("Request received.")
  );
};

exports.listown = (req, res) => {
  const decoded = jwt_decode(req.header("auth-token"));
  Article.findByUserID(decoded.id).then((result) => {
    res.status(200).send(result);
  });
};
