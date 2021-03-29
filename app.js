const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongooseLoader = require("./config/mongooseLoader");

const passport = require("passport");
const passportLoader = require("./config/passport");
const dotenv = require("dotenv");
const createError = require("http-errors");
const path = require("path");

const app = express();
app.use(passport.initialize());
dotenv.config();
mongooseLoader();
passportLoader();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    saveUninitialized: true,
    secret: "keyboard cat",
    resave: false,
    cookie: { maxAge: 60000 },
  })
);

const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const logInRouter = require("./routes/logIn");
app.use("/", indexRouter);
app.use("/signup", signUpRouter);
app.use("/login", logInRouter);

app.use(function (req, res, next) {
  next(createError(404, "404 error"));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
