const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  keywords: {
    type: String,
  },
  warmer: {
    type: String,
  },
  content: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  originalURL: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Article", articleSchema, "Articles");
