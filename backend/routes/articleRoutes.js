const router = require("express").Router();
const verifyToken = require("../middlewares/veryfyToken");
const ArticleController = require("../controllers/articles.controller");

router.get("/", ArticleController.list);

router.post("/", verifyToken, ArticleController.insert);

router.get("/withtasks", verifyToken, ArticleController.listall);

router.get("/own", verifyToken, ArticleController.listown);

router.patch("/own/:id", verifyToken, ArticleController.patchById);

router.delete("/own/:id", verifyToken, ArticleController.removeById);

module.exports = router;
