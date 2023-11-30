const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res, next) => {
  try {
    const data = await UserModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const register = async (req, res, next) => {
  try {
    const user = req.body;
    const existingUser = await UserModel.findOne({ user: user.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      email: user.email,
      password: hashedPassword,
      departmentId: user.departmentId,
      roleId: user.roleId,
      status: user.status,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUser,
  register,
};
