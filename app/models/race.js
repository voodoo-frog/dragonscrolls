const mongoose = require("mongoose");

const RaceSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  brief: {
    type: String,
    required: true,
  },
  ability_score_desc: {
    type: String,
    required: true,
  },
  ability_bonuses: Array,
  ability_bonus_options: {
    choose: Number,
    type: { type: String },
    from: Array,
  },
  alignment: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  size_description: {
    type: String,
    required: true,
  },
  starting_proficiencies: Array,
  starting_proficiency_options: Array,
  languages: Array,
  language_options: {
    choose: Number,
    type: { type: String },
    from: Array,
  },
  language_desc: {
    type: String,
    required: true,
  },
  traits: Array,
  subraces: Array,
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

module.exports = mongoose.models.Race || mongoose.model("Race", RaceSchema);
