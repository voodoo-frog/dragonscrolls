const mongoose = require("mongoose");

const AbilityScoreSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  desc: {
    type: Array,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.AbilityScore ||
  mongoose.model("AbilityScore", AbilityScoreSchema);
