const mongoose = require("mongoose");

const ProficiencySchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  classes: {
    type: Array,
    required: true,
  },
  races: {
    type: Array,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  reference: {
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
  source_book: {
    type: String,
    required: true,
    default: "Basic Rules",
  },
});

module.exports =
  mongoose.models.Proficiency ||
  mongoose.model("Proficiency", ProficiencySchema);
