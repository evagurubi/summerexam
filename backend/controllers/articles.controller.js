const Article = require("../services/article.service");
const jwt_decode = require("jwt-decode");

//It sends back article title and content, 12 per page
exports.list = (req, res) => {
  let page = 0;
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }

  Article.listarticlepages(12, page).then((result) => {
    let returnArray = [];
    let myItem = {};
    result.map((item) => {
      myItem = { title: item.title, content: item.content };
      returnArray = [...returnArray, myItem];
    });
    res.json(returnArray);
  });
};

//It sends back article and tasks, links etc., possible search by keyword or by content
exports.listall = (req, res) => {
  let keyword = null;
  let content = null;
  if (req.query) {
    
    if (req.query.keyword) {
      keyword = req.query.keyword;
    }
    if (req.query.content) {
      content = req.query.content;
    }
  }

  Article.list(keyword, content).then((result) => res.json(result));
};

//Logged-in users post articles. Auth-token required in header.
exports.insert = (req, res) => {
  const decoded = jwt_decode(req.header("auth-token"));

  Article.createArticle(req.body, decoded.id).then((result) =>
    res.status(201).send("Request received.")
  );
};

//It sends back articles posted by logged-in user
exports.listown = (req, res) => {
  const decoded = jwt_decode(req.header("auth-token"));
  if (decoded.isAdmin === true)
    Article.list().then((result) => {
      res.status(200).send(result);
    });
  else
    Article.findByUserID(decoded.id).then((result) => {
      
      res.status(200).send(result);
    });
};

//Logged-in users modify their own chosen articles
exports.patchById = (req, res) => {
  Article.patchArticle(req.params.id, req.body).then((result) => {
    if (result.message) res.status(201).send({ message: result.message });
    else {
      res.status(201).send({ id: result._id });
    }
  });
};

//Logged-in users delete their own chosen articles
exports.removeById = (req, res) => {
  Article.removeById(req.params.id).then((result) => {
    res.status(204).send({});
  });
};
