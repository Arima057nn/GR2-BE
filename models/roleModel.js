const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    value: { type: Number },
  },
  {
    timestamps: true,
    collection: "Roles",
  }
);

const RoleModel = mongoose.model("Roles", RoleSchema);

module.exports = RoleModel;
