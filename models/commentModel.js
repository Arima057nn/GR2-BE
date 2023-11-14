const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String },
    status: { type: Number },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      require: true,
    },
    requestId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Requests",
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "Comments",
  }
);

const CommentModel = mongoose.model("Comments", CommentSchema);

module.exports = CommentModel;
