const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  typical_speakers: {
    type: Array,
    required: true,
  },
  script: String,
  desc: String,
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
  mongoose.models.Language || mongoose.model("Language", LanguageSchema);
