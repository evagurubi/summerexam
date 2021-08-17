const router = require("express").Router();
const UserController = require("../controllers/users.controller");
const verifyToken = require("../middlewares/veryfyToken");

//Login with Google
router.post("/login", UserController.insert);
router.get("/", verifyToken, UserController.listUser);
router.delete("/", verifyToken, UserController.removeUser);

module.exports = router;
