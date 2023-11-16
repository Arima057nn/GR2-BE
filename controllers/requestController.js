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

module.exports = {
  getAllRequest,
};
