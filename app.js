require("dotenv").config();
require("./database/db");

const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: { maxAge: 2 * 60 * 60 * 1000 },
  store: new MongoDBStore({
    uri: process.env.MONGODB_ATLAS_URI,
    collection: process.env.SESSION_COLLECTION_PATH,
  }),
}));
app.use((req, res, next) => {
  res.locals.isLogin = req.session.userId ? true : false;
  next();
});

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const indexRouter = require("./routes/index");
const votingsRouter = require("./routes/votings");
const myVotingsRouter = require("./routes/myVotings");
const logoutRouter = require("./routes/logout");

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/", indexRouter);
app.use("/votings", votingsRouter);
app.use("/my-votings", myVotingsRouter);
app.use("/logout", logoutRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;

  if (req.app.get("env") !== "development") delete err.stack;

  res.locals.error = err;

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
