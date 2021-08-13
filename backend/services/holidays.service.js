const UKholiday = require("../models/UKholiday");
const USholiday = require("../models/USholiday");
const Ausholiday = require("../models/Ausholiday");
const axios = require("axios");

exports.createUKholiday = async (req) => {
  let year = req.query.year;
  let month = req.query.month;
  let day = req.query.day;
  let newdate = day + "/" + month;

  let existingUKHoliday = await UKholiday.findOne({ date: newdate });

  if (existingUKHoliday) return existingUKHoliday;

  let response = await axios.get(
    `https://holidays.abstractapi.com/v1/?api_key=f1fab01a5ea24ac7afd5eecb600df352&country=GB&year=${year}&month=${month}&day=${day}`
  );
  //console.log(response.data);
  let holidayObject;
  if (response.data.length === 0)
    holidayObject = {
      name: "",
      type: "",
      date: newdate,
    };
  else
    holidayObject = {
      name: response.data[0].name,
      type: response.data[0].type,
      date: newdate,
    };
  const ukholiday = new UKholiday(holidayObject);
  ukholiday.save();
  //console.log("service", ukholiday);
  return holidayObject;
};

exports.createUSholiday = async (req) => {
  let year = req.query.year;
  let month = req.query.month;
  let day = req.query.day;
  let newdate = day + "/" + month;

  let existingUSHoliday = await USholiday.findOne({ date: newdate });

  if (existingUSHoliday) return existingUSHoliday;

  let response = await axios.get(
    `https://holidays.abstractapi.com/v1/?api_key=f1fab01a5ea24ac7afd5eecb600df352&country=US&year=${year}&month=${month}&day=${day}`
  );
  //console.log(response.data);
  let holidayObject;
  if (response.data.length === 0)
    holidayObject = {
      name: "",
      type: "",
      date: newdate,
    };
  else
    holidayObject = {
      name: response.data[0].name,
      type: response.data[0].type,
      date: newdate,
    };
  const usholiday = new USholiday(holidayObject);
  usholiday.save();
  //console.log("service", ukholiday);
  return holidayObject;
};

exports.createAusholiday = async (req) => {
  let year = req.query.year;
  let month = req.query.month;
  let day = req.query.day;
  let newdate = day + "/" + month;

  let existingAusHoliday = await Ausholiday.findOne({ date: newdate });

  if (existingAusHoliday) return existingAusHoliday;

  let response = await axios.get(
    `https://holidays.abstractapi.com/v1/?api_key=f1fab01a5ea24ac7afd5eecb600df352&country=AU&year=${year}&month=${month}&day=${day}`
  );
  //console.log(response.data);
  let holidayObject;
  if (response.data.length === 0)
    holidayObject = {
      name: "",
      type: "",
      date: newdate,
    };
  else
    holidayObject = {
      name: response.data[0].name,
      type: response.data[0].type,
      date: newdate,
    };
  const ausholiday = new Ausholiday(holidayObject);
  ausholiday.save();
  //console.log("service", ukholiday);
  return holidayObject;
};
