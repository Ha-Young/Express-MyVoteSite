const mongoose = require("mongoose");

const DB = process.env.DB_URL.replace(
  "<password>",
  process.env.DB_PASSWORD,
);

mongoose.connect(
  // process.env.DB_LOCAL,
  DB,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
);

const db = mongoose.connection;

db.on("error", () => console.log("❌ DB connection fail!"));
db.once("open", () => console.log(`✅ DB connected to : http://localhost:${process.env.PORT}`));

module.exports = db;
