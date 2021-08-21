const Article = require("../models/Article");

exports.list = (keyword, content) => {
  return new Promise((resolve, reject) => {
    //With queryparameter keyword (chunks also apply because of regex) 
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
    //With queryparameter content (chunks also apply because of regex)
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

//DB queries for articles complete with tasks
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

//Saving new articles to DB
exports.createArticle = async (articleBody, id) => {
  const article = new Article({ ...articleBody, userId: id });

  return article.save();
};

//DB queries for user's own articles
exports.findByUserID = (id) => {
  return Article.find({ userId: id })
  .then((result) => {
    //result = result.toJSON();

    return result;
  });
};

//Updates user's own article in DB
exports.patchArticle = async (id, articleData) => {
  return Article.findOneAndUpdate(
    {
      _id: id,
    },
    articleData
  );
};

//Deletes user's own article from DB
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
