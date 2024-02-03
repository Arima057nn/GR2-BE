const express = require("express");

const {
  getAllRequest,
  createRequest,
  getRequestsByUser,
  getRequestsByStatus,
  getRequest,
  changeStatusRequest,
} = require("../controllers/requestController");
const { authenTokenUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllRequest);
router.post("/create", authenTokenUser, createRequest);
router.get("/user/:userId", getRequestsByUser);
router.get("/status/", getRequestsByStatus);
router.get("/:_id", getRequest);
router.put("/:_id", changeStatusRequest);

module.exports = router;
