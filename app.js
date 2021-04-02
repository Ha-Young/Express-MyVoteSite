const dotenv = require("dotenv");
dotenv.config({ path: "./.env"});
require("./config/mongoDB");
require("./config/passport");

const createError = require("http-errors");
const passport = require("passport");
const express = require("express");
const path = require("path");
const mongoSession = require("./config/mongoDB/session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const flash = require("connect-flash");

const indexRouter = require("./routes/index");
const votingsRouter = require("./routes/votings/index");
const myVotingsRouter = require("./routes/myVotings");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
} else {
  app.use(logger("combined"));
}

app.use(mongoSession);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("public"));
app.use(flash());

app.use("/", indexRouter);
app.use("/votings", votingsRouter);
app.use("/my-votings", myVotingsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", { title: "Error", err });
});

module.exports = app;
