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

const createRole = async (req, res, next) => {
  try {
    const role = req.body;

    console.log("req.body:", req.body);
    const existingRole = await RoleModel.findOne({ name: role.name });

    if (existingRole) {
      return res.status(400).json({ error: "Role already exists" });
    }

    const newRole = await RoleModel.create({
      name: role.name,
      value: role.value,
      description: role.description,
    });

    res.json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Failed to create role" });
  }
};

module.exports = {
  getAllRole,
  createRole,
};
