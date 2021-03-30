const session = require("express-session");
const MongoStore = require("connect-mongo");
const clientPromise = require("../db");

const sessionLoader = (app) => {
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      clientPromise,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 30
    },
  }));
};

module.exports = sessionLoader;
