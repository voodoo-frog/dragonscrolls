const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  class: {
    index: String,
    name: String,
    url: String,
  },
  subclass: {
    index: String,
    name: String,
    url: String,
  },
  name: {
    type: String,
    required: true,
  },
  main_category: Boolean,
  level: {
    type: Number,
    required: true,
  },
  category: String,
  prerequisites: {
    type: Array,
    required: true,
  },
  desc: {
    type: Array,
    required: true,
  },
  parent: {
    index: String,
    name: String,
    url: String,
  },
  feature_specific: Object,
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
  mongoose.models.Feature || mongoose.model("Feature", FeatureSchema);
