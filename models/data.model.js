const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  CategoryName: {
    type: String,
    enum: ["Birayani", "Rice", "Starter", "Pizza"],
    required: true,
  },

  name: { type: String, required: true },
  img: { type: String, required: true },
  options: { type: Array, required: true },
  description: { type: String },
});

const DataModel = mongoose.model("food_items", dataSchema);

module.exports = { DataModel };
