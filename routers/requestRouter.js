const express = require("express");

const {
  getAllRequest,
  createRequest,
  getRequestsByUser,
  getRequest,
  changeStatusRequest,
} = require("../controllers/requestController");
const { authenToken } = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllRequest);
router.post("/create", authenToken, createRequest);
router.get("/user/:userId", getRequestsByUser);
router.get("/:_id", getRequest);
router.put("/:_id", changeStatusRequest);

module.exports = router;
