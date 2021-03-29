const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectMongoose = async () => {
  console.log(process.env.DB_CONNECT);
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to mongodb");
  } catch (error) {
    console.log("error on connect to mongodb");
  }
};

module.exports = connectMongoose;
