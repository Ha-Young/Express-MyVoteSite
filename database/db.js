const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error);
db.once("open", () => {
  console.log("mongoose has connected to mongodb");
});
