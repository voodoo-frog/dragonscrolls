const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
  ability_score_bonuses: Number,
  prof_bonus: Number,
  features: Array,
  spellcasting: Object,
  class_specific: Object,
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
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Level || mongoose.model("Level", LevelSchema);
