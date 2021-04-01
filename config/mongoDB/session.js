const session = require("express-session");
const MongoStore = require("connect-mongo");
const DB_APP_URL = process.env.DB_APP_URL.replace("<DB_PASSWORD>", process.env.DB_PASSWORD);

const mongoSession = session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: DB_APP_URL }),
});

module.exports = mongoSession;
