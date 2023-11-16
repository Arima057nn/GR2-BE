const RoleModel = require("../models/roleModel");

const getAllRole = async (req, res, next) => {
  try {
    const data = await RoleModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllRole,
};
