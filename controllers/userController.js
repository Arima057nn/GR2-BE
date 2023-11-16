const UserModel = require("../models/userModel");

const getAllUser = async (req, res, next) => {
  try {
    const data = await UserModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUser,
};
