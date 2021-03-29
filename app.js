require("dotenv").config();
require("./database/db");

const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const app = express();

// view engine setup
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");

app.use("/", indexRouter);
app.use("/signup", signupRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
