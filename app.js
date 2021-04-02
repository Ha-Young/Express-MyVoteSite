require("dotenv").config();
require("./initDB");
require("./passport");
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const logger = require("morgan");

const indexRouter = require("./routes/globalRouter");
const voteRouter = require("./routes/voteRouter");
const myVoteRouter = require("./routes/myVotingRouter");
const passport = require("passport");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());
app.use(session({
  secret: true,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
}));
app.use(flash());
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/votings", voteRouter);
app.use("/my-votings", myVoteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
