const express = require("express");

const {
  getAllRequest,
  createRequest,
  getRequestsByUser,
  getRequestsByStatus,
  getRequest,
  changeStatusRequest,
  getRequestsByManager,
} = require("../controllers/requestController");
const {
  authenTokenUser,
  authenTokenManager,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllRequest);
router.post("/create", authenTokenUser, createRequest);
router.get("/user/:userId", getRequestsByUser);
router.get("/manager/:status", authenTokenManager, getRequestsByManager);
router.get("/status/", getRequestsByStatus);
router.get("/:_id", getRequest);
router.put("/change", changeStatusRequest);

module.exports = router;
