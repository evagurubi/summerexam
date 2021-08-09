const mongoose = require("mongoose");

const ausholidaySchema = new mongoose.Schema({
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

module.exports = mongoose.model("ausholiday", ausholidaySchema);
