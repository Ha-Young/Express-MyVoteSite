const mongoose = require("mongoose");
const MONGO_URI = require("../constants/database");

function connectDatabase() {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);

  mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to mongod server");
  });
}

module.exports = connectDatabase;



