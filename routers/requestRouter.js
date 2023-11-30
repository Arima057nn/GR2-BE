const express = require("express");

const {
  getAllRequest,
  createRequest,
  getRequestsByUser,
  getRequest,
  changeStatusRequest,
} = require("../controllers/requestController");
const router = express.Router();

router.get("/", getAllRequest);
router.post("/create", createRequest);
router.get("/user/:userId", getRequestsByUser);
router.get("/:_id", getRequest);
router.put("/:_id", changeStatusRequest);

module.exports = router;
