const DepartmentModel = require("../models/departmentModel");

const getAllDepartment = async (req, res, next) => {
  try {
    const data = await DepartmentModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createDepartment = async (req, res, next) => {
  try {
    const department = req.body;

    const existingDepartment = await DepartmentModel.findOne({
      name: department.name,
    });

    if (existingDepartment) {
      return res.status(400).json({ error: "Department already exists" });
    }

    const newDepartment = await DepartmentModel.create({
      name: department.name,
      status: department.status,
      description: department.description,
    });

    res.json(newDepartment);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Failed to create department" });
  }
};

module.exports = {
  getAllDepartment,
  createDepartment,
};
