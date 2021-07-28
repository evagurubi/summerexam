const router = require("express").Router();
const UserController = require("../controllers/users.controller");
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

router.patch("/ownarticles/:id", verifyToken, ArticleController.patchById);

router.delete("/ownarticles/:id", verifyToken, ArticleController.removeById);

module.exports = router;
