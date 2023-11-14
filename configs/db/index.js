const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Arima:namikazeMinato@cluster1.fr3hokc.mongodb.net/Request_Gate"
    );
    console.log("MongoDB running ...");
  } catch (error) {
    console.log(error);
    console.log("Connect failure");
  }
};
module.exports = { connectDB };
