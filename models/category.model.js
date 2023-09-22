const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
    },
  },
  { collection: "foodCategory" }
);

const CategoryModel = mongoose.model("foodCategory", categorySchema);

module.exports = { CategoryModel };