const express = require("express");

const {
  getAllDepartment,
  createDepartment,
} = require("../controllers/departmentController");
const router = express.Router();

router.get("/", getAllDepartment);
router.post("/create", createDepartment);

module.exports = router;
