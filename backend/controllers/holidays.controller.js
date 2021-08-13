//const axios = require("axios");
const UKholiday = require("../services/holidays.service");
const USholiday = require("../services/holidays.service");
const Ausholiday = require("../services/holidays.service");

exports.uklist = async (req, res) => {
  // console.log("req1");
  await UKholiday.createUKholiday(req).then((result) => {
    // console.log("controller", result);
    res.json({ message: result });
  });
};

exports.uslist = async (req, res) => {
  await USholiday.createUSholiday(req).then((result) => {
    //  console.log("controller", result);
    res.json({ message: result });
  });
};

exports.auslist = async (req, res) => {
  //  console.log("req3");
  await Ausholiday.createAusholiday(req).then((result) => {
    //  console.log("controller", result);
    res.json({ message: result });
  });
};
