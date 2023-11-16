const express = require("express");

const { getAllRequest } = require("../controllers/requestController");
const router = express.Router();

router.get("/", getAllRequest);

module.exports = router;
