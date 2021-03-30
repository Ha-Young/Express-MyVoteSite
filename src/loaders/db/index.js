const mongoose = require("mongoose");

const clientPromise = mongoose.connect(process.env.MONGO_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(result => result.connection.getClient());

const db = mongoose.connection;
let url;

switch (process.env.NODE_ENV) {
  case "production":
    url = `http://localhost:${process.env.PORT || 4000}`;
    break;
  case "development":
    url = `http://localhost:${process.env.PORT || 4000}`;
    break;
  default:
    url = `http://localhost:${process.env.PORT || 4000}`;
}

db.on("error", () => console.log("❌ Connection Failed!"));
db.once("open", () => console.log(`✅ Connected to: ${url}`));

module.exports = clientPromise;
