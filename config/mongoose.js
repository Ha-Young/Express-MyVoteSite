const mongoose = require("mongoose");
const db = mongoose.connection;

function mongooseConfig() {
  mongoose.connect(
    `mongodb+srv://takhyunkim:${process.env.MONGOOSE_PASSWORD}@voting-platform.wgyg1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
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
