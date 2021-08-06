const mongoose = require("mongoose");

const ukholidaySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("ukholiday", ukholidaySchema);
