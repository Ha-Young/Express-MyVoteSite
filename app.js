require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

const configs = require("./configs");
require("./configs/passport");

const mongoose = require("mongoose");
const DB = configs.serverAddress.replace("<password>", configs.password);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => console.log("server connect!!"));

const db = mongoose.connection;

db.on("error", () => console.log("error"));
db.once("open", () => console.log("connect!!!"));

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const votingsRouter = require("./routes/votings");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(session({
  secret: "secret code",
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/votings", votingsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
