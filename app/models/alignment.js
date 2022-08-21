const mongoose = require("mongoose");

const AlignmentSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  abbreviation: {
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
  mongoose.models.Alignment || mongoose.model("Alignment", AlignmentSchema);
