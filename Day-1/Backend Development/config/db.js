const mongoose = require("mongoose");

connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/innvoket");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("error connecting MongoDB ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
