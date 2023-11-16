const express = require("express");

const { getAllRole, createRole } = require("../controllers/roleController");
const router = express.Router();

router.get("/", getAllRole);
router.post("/create", createRole);

module.exports = router;
