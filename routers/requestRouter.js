const express = require("express");

const {
  getAllRequest,
  createRequest,
  getRequestsByUser,
  getRequestsByStatus,
  getRequest,
  changeStatusRequest,
  getRequestsByManager,
  getRequestsByAdmin,
} = require("../controllers/requestController");
const {
  authenTokenUser,
  authenTokenManager,
  authenTokenAdmin,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllRequest);
router.post("/create", authenTokenUser, createRequest);
router.get("/user/:userId", getRequestsByUser);
router.get("/manager/:status", authenTokenManager, getRequestsByManager);
router.get("/admin/:status", authenTokenAdmin, getRequestsByAdmin);
router.get("/status/", getRequestsByStatus);
router.get("/:_id", getRequest);
router.put("/change", changeStatusRequest);

module.exports = router;
