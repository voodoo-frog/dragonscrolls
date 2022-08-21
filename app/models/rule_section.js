const mongoose = require("mongoose");

const RuleSectionSchema = new mongoose.Schema({
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
  url: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.RuleSection ||
  mongoose.model("RuleSection", RuleSectionSchema);
