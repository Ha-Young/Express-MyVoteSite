const mongoose = require("mongoose");
const DB_APP_URL = process.env.DB_APP_URL.replace("<DB_PASSWORD>", process.env.DB_PASSWORD);
const mongoDb = mongoose.connection;

mongoose.connect(
  DB_APP_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

mongoDb.on("err", (err) => {
  console.warn(`db connection is failed, ${err}`);
});

mongoDb.once("open", () => {
  console.warn(`Mongodb connected, ${mongoDb.host}`);
});

module.exports = mongoDb;
