const mongoose = require("mongoose");

const usholidaySchema = new mongoose.Schema({
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

module.exports = mongoose.model("usholiday", usholidaySchema);
