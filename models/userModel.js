const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    status: { type: Number },
    roleId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Roles",
      require: true,
    },
    departmentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Departments",
      require: true,
    },
    image: {
      type: String,
      maxlength: 1000,
      default:
        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
