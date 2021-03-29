const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: "voting"
});

const database = mongoose.connection;

database.on("open", () => {
  console.log("MongoDB connection is successed")
});

database.on("error", () => {
  console.log("MongoDB connection is failed.")
});

module.exports = database;
