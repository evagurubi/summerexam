//const axios = require("axios");
const UKholiday = require("../services/ukholiday.service");

exports.uklist = (req, res) => {
  console.log("req");
  UKholiday.createUKholiday(req).then((result) => {
    // console.log(result);
    res.json({ message: result });
  });
};
