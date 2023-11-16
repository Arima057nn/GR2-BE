const CategoryModel = require("../models/categoryModel");

const getAllCategory = async (req, res, next) => {
  try {
    const data = await CategoryModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching Categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = req.body;

    const existingCategory = await CategoryModel.findOne({
      name: category.name,
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const newCategory = await CategoryModel.create({
      name: category.name,
      status: category.status,
      description: category.description,
    });

    res.json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

module.exports = {
  getAllCategory,
  createCategory,
};
