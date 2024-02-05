const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    status: { type: Number },
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
    managerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "Requests",
  }
);

const RequestModel = mongoose.model("Requests", RequestSchema);

module.exports = RequestModel;
