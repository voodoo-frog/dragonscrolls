const mongoose = require("mongoose");

const MagicSchoolSchema = new mongoose.Schema({
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
  mongoose.models.MagicSchool ||
  mongoose.model("MagicSchool", MagicSchoolSchema);
