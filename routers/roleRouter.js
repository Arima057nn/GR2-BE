const express = require("express");

const { getAllRole } = require("../controllers/roleController");
const router = express.Router();

router.get("/", getAllRole);

module.exports = router;
