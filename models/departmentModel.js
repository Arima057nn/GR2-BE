const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    status: { type: Number },
  },
  {
    timestamps: true,
    collection: "Departments",
  }
);

const DepartmentModel = mongoose.model("Departments", DepartmentSchema);

module.exports = DepartmentModel;
