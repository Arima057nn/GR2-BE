const mongoose = require("mongoose");

const CategoryUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      require: true,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Categories",
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "CategoryUser",
  }
);

const CategoryUserModel = mongoose.model("CategoryUser", CategoryUserSchema);

module.exports = CategoryUserModel;
