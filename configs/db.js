const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

function initialize() {
  const db = mongoose.connection;
  
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Connected to Database"));
}

module.exports = initialize;
