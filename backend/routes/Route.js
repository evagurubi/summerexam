const router = require("express").Router();
const UserController = require("../controllers/users.controller");
const verifyToken = require("../middlewares/veryfyToken");
const ArticleController = require("../controllers/articles.controller");
const HolidayController = require("../controllers/holidays.controller");

//Login with Google
router.post("/login", UserController.insert);
router.get("/account", verifyToken, UserController.listUser);
router.delete("/account", verifyToken, UserController.removeUser);

router.get("/", (req, res) => {
  res.status(200).json({ message: "We are on home" });
});

router.get("/articles", ArticleController.list);

router.get("/ukholidays", HolidayController.uklist);

router.get("/usholidays", HolidayController.uslist);

router.get("/ausholidays", HolidayController.auslist);

router.get("/articleswithtasks", verifyToken, ArticleController.listall);

router.post("/articles", verifyToken, ArticleController.insert);

router.get("/ownarticles", verifyToken, ArticleController.listown);

router.patch("/ownarticles/:id", verifyToken, ArticleController.patchById);

router.delete("/ownarticles/:id", verifyToken, ArticleController.removeById);

module.exports = router;
