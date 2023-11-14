const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    tittle: { type: String },
    content: { type: String },
    status: { type: Number },
    level: { type: Number },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      require: true,
    },
    assignee: {
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
    collection: "Requests",
  }
);

const RequestModel = mongoose.model("Requests", RequestSchema);

module.exports = RequestModel;
