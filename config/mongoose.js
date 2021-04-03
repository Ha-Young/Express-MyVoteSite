const mongoose = require("mongoose");
const db = mongoose.connection;

function mongooseConfig() {
  mongoose.connect(
    process.env.MONGOOSE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

  db.on("error", console.error);

  db.once("open", () => {
    console.log("Successfully connected to mongdb");
  });
}

module.exports = mongooseConfig;
