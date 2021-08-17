const router = require("express").Router();
const HolidayController = require("../controllers/holidays.controller");

router.get("/uk", HolidayController.uklist);

router.get("/us", HolidayController.uslist);

router.get("/aus", HolidayController.auslist);

module.exports = router;
