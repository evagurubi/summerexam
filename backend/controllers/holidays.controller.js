//const axios = require("axios");
const UKholiday = require("../services/holidays.service");
const USholiday = require("../services/holidays.service");
const Ausholiday = require("../services/holidays.service");

//Sends back holiday in the UK on given day
exports.uklist = async (req, res) => {
  await UKholiday.createUKholiday(req).then((result) => {
    res.json({ message: result });
  });
};

//Sends back holiday in the US on given day
exports.uslist = async (req, res) => {
  await USholiday.createUSholiday(req).then((result) => {
    res.json({ message: result });
  });
};

//Sends back holiday in Australia on given day
exports.auslist = async (req, res) => {
  await Ausholiday.createAusholiday(req).then((result) => {
    res.json({ message: result });
  });
};
