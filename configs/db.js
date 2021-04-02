const configs = require("../configs");

const mongoose = require("mongoose");
const DB = configs.serverAddress.replace("<password>", configs.password);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => console.log("server connect!!"));

const db = mongoose.connection;

db.on("error", () => console.log("error"));
db.once("open", () => console.log("connect!!!"));
