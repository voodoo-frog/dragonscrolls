const mongoose = require("mongoose");

const WeaponPropertySchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: Array,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.WeaponProperty ||
  mongoose.model("WeaponProperty", WeaponPropertySchema);
