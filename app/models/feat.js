const mongoose = require("mongoose");

const FeatSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: Array,
    required: true,
  },
  desc: {
    type: Array,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  source_book: {
    type: String,
    required: true,
    default: "Player's Handbook",
  },
});

module.exports = mongoose.models.Feat || mongoose.model("Feat", FeatSchema);
