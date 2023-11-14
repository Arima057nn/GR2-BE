const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
    collection: "Categories",
  }
);

const CategoryModel = mongoose.model("Categories", CategorySchema);

module.exports = CategoryModel;
