const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  subsections: {
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
    default: "Basic Rules",
  },
});

module.exports = mongoose.models.Rule || mongoose.model("Rule", RuleSchema);
