const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("connect-flash");

const mongooseLoader = require("./config/mongooseLoader");

const app = express();
mongooseLoader();
dotenv.config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    saveUninitialized: true,
    secret: "keyboard cat",
    resave: false,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
app.use("/", indexRouter);
app.use("/signUp", signUpRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// global error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
