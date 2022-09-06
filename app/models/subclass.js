const mongoose = require("mongoose");

const SubclassSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  class: {
    index: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  flavor_name: {
    type: String,
    required: true,
  },
  subclass_flavor: {
    type: String,
    required: true,
  },
  desc: {
    type: Array,
    required: true,
  },
  subclass_levels: {
    type: String,
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

module.exports =
  mongoose.models.Subclass || mongoose.model("Subclass", SubclassSchema);
