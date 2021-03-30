const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");

const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("MongoDB Connection Error : ("));
db.once("open", () => console.log("MongoDB Connection Success! : )"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 10 * 60 * 1000 },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  // res.render("error");
  res.send(err.message);
});

module.exports = app;
