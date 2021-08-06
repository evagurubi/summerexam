const UKholiday = require("../models/UKholiday");
const axios = require("axios");

exports.createUKholiday = async (req) => {
  let year = req.query.year;
  let month = req.query.month;
  let day = req.query.day;
  let newdate = day + "/" + month;
  console.log(newdate);
  let existingHoliday = await UKholiday.findOne({ date: newdate });
  if (!existingHoliday) {
    axios
      .get(
        `https://holidays.abstractapi.com/v1/?api_key=f1fab01a5ea24ac7afd5eecb600df352&country=GB&year=${year}&month=${month}&day=${day}`
      )
      .then((response) => {
        const ukholiday = new UKholiday({
          name: response.data[0].name,
          type: response.data[0].type,
          date: newdate,
        });
        console.log(ukholiday);
        return ukholiday.save();
      })
      .catch((error) => {
        console.log(error);
      });
  } else return existingHoliday;
};
