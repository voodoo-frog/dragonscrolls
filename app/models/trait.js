const mongoose = require("mongoose");

const TraitSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  races: Array,
  subraces: Array,
  desc: Array,
  proficiencies: Array,
  traits: Array,
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

module.exports = mongoose.models.Trait || mongoose.model("Trait", TraitSchema);
