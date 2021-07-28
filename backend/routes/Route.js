const router = require("express").Router();
//const fetch = require("node-fetch");
//const jwt = require("jsonwebtoken");
//const dotenv = require("dotenv");
//const jwt_decode = require("jwt-decode");
//const User = require("../models/User");
const UserController = require("../controllers/users.controller");
//const Article = require("../models/Article");
const verifyToken = require("../middlewares/veryfyToken");
const ArticleController = require("../controllers/articles.controller");

//Login with Google
router.post("/login", UserController.insert);

router.get("/", (req, res) => {
  res.send("We are on home");
});

router.get("/articles", ArticleController.list);

router.get("/articleswithtasks", verifyToken, ArticleController.listall);

router.post("/articles", verifyToken, ArticleController.insert);

router.get("/ownarticles", verifyToken, ArticleController.listown);

module.exports = router;
