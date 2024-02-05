const RequestModel = require("../models/requestModel");
const RoleModel = require("../models/roleModel");
const UserModel = require("../models/userModel");

const getAllRequest = async (req, res, next) => {
  try {
    const data = await RequestModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching Requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createRequest = async (req, res, next) => {
  try {
    const request = req.body;
    const user = req.user;
    const roleManager = await RoleModel.findOne({
      value: 2,
    });
    const foundManager = await UserModel.findOne({
      departmentId: user.departmentId,
      roleId: roleManager._id,
    });

    const newRequest = await RequestModel.create({
      title: request.title,
      content: request.content,
      status: request.status,
      userId: request.userId,
      categoryId: request.categoryId,
      managerId: foundManager,
    });
    res.json(newRequest);
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Failed to create request" });
  }
};

const getRequestsByUser = async (req, res, next) => {
  const { userId } = req.params;
  RequestModel.find({
    userId: userId,
  })
    .populate("categoryId")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to get requests" });
    });
};

const getRequestsByManager = async (req, res, next) => {
  const { status } = req.params;
  const user = req.user;

  RequestModel.find({
    managerId: user.userId,
    status,
  })
    .populate("categoryId")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to get requests" });
    });
};

const getRequest = async (req, res, next) => {
  const { _id } = req.params;
  RequestModel.find({
    _id: _id,
  })
    .populate("userId")
    .populate("categoryId")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to get request" });
    });
};

const getRequestsByStatus = async (req, res, next) => {
  const { status } = req.body;
  RequestModel.find({
    status: status,
  })
    .populate("userId")

    .populate("categoryId")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to get request" });
    });
};

const changeStatusRequest = async (req, res, next) => {
  const requestId = req.query.requestId;
  const status = req.query.status;
  console.log(requestId, status);
  RequestModel.findByIdAndUpdate(requestId, { status: status }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "Request not found" });
      }
      res.json(data);
    })
    .catch((error) => {
      console.error("Error updating request:", error);
      res.status(500).json({ error: "Failed to update request" });
    });
};

module.exports = {
  getAllRequest,
  createRequest,
  getRequestsByUser,
  getRequestsByManager,
  getRequestsByStatus,
  getRequest,
  changeStatusRequest,
};
