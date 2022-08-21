const mongoose = require("mongoose");

const ConditionSchema = new mongoose.Schema({
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
  mongoose.models.Condition || mongoose.model("Condition", ConditionSchema);
