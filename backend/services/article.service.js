const Article = require("../models/Article");

exports.list = (keyword, content) => {
  return new Promise((resolve, reject) => {
    if (keyword) {
      Article.find({ keywords: { $regex: keyword, $options: "i" } })
        .sort({ $natural: -1 })
        .exec(function (err, articles) {
          if (err) {
            //console.log(err);
            reject(err);
          } else {
            resolve(articles);
            // console.log(articles);
          }
        });
    }
    if (content) {
      Article.find({ content: { $regex: content, $options: "i" } })
        .sort({ $natural: -1 })
        .exec(function (err, articles) {
          if (err) {
            //console.log(err);
            reject(err);
          } else {
            resolve(articles);
            // console.log(articles);
          }
        });
    } else
      Article.find()
        .sort({ $natural: -1 })
        .exec(function (err, articles) {
          if (err) {
            //console.log(err);
            reject(err);
          } else {
            resolve(articles);
            // console.log(articles);
          }
        });
  });
};

exports.listarticlepages = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Article.find()
      .limit(perPage)
      .sort({ $natural: -1 })
      .skip(perPage * page)
      .exec(function (err, articles) {
        if (err) {
          //console.log(err);
          reject(err);
        } else {
          resolve(articles);
          // console.log(articles);
        }
      });
  });
};

exports.createArticle = async (articleBody, id) => {
  const article = new Article({ ...articleBody, userId: id });

  return article.save();
};

exports.findByUserID = (id) => {
  return Article.find({ userId: id })
  .then((result) => {
    //result = result.toJSON();

    return result;
  });
};

exports.patchArticle = async (id, articleData) => {
  return Article.findOneAndUpdate(
    {
      _id: id,
    },
    articleData
  );
};

exports.removeById = (id) => {
  return new Promise((resolve, reject) => {
    Article.deleteMany({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
