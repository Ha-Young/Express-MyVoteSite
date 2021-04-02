require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
require("./loaders/database");

const index = require("./routes/index");
const users = require("./routes/users");
const votings = require("./routes/votings");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/users", users);
app.use("/votings", votings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "페이지를 찾을 수 없습니다."));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { error: err });
});

module.exports = app;
