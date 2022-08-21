const mongoose = require("mongoose");

const SubraceSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  race: {
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
  desc: {
    type: String,
    required: true,
  },
  ability_bonuses: {
    type: Array,
    required: true,
  },
  starting_proficiencies: {
    type: Array,
    required: true,
  },
  languages: {
    type: Array,
    required: true,
  },
  language_options: {
    choose: Number,
    type: { type: String },
    from: Array,
  },
  racial_traits: {
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

module.exports =
  mongoose.models.Subrace || mongoose.model("Subrace", SubraceSchema);
