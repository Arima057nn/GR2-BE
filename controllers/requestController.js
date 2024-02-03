const RequestModel = require("../models/requestModel");

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

    const newRequest = await RequestModel.create({
      tittle: request.tittle,
      content: request.content,
      status: request.status,
      level: request.level,
      userId: request.userId,
      assignee: request.assignee,
      categoryId: request.categoryId,
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
    .populate("assignee")
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
    .populate("assignee")
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
    .populate("assignee")
    .populate("categoryId")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to get request" });
    });
};

const changeStatusRequest = async (req, res, next) => {
  const { _id } = req.params;
  RequestModel.findByIdAndUpdate(_id, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update request" });
    });
};
module.exports = {
  getAllRequest,
  createRequest,
  getRequestsByUser,
  getRequestsByStatus,
  getRequest,
  changeStatusRequest,
};
