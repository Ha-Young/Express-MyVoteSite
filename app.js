require("dotenv").config();
require("./db.js");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const index = require("./routes/index");
const auth = require("./routes/auth");

const errorController = require("./routes/controllers/errorController");

const AppError = require("./utils/AppError");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/auth", auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new AppError("Page Not Found.", 404));
});

// error handler
app.use(errorController);

module.exports = app;
