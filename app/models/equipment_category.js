const mongoose = require("mongoose");

const EquipmentCategorySchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  equipment: {
    type: Array,
    required: true,
  },
});

module.exports =
  mongoose.models.EquipmentCategory ||
  mongoose.model("EquipmentCategory", EquipmentCategorySchema);
