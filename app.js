const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const passportConfig = require("./config/passport");
const mongooseConfig = require("./config/mongoose");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth/index");
const votingRouter = require("./routes/voting/index");

const ERROR_MESSAGE = require("./constants/errorConstants");

const app = express();

require("dotenv").config();

passportConfig(app);
mongooseConfig();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/voting", votingRouter);

app.use(function(req, res, next) {
  next(createError(404, ERROR_MESSAGE.NOT_FOUND));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
