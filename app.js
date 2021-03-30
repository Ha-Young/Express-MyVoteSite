require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const passport = require("passport");

const index = require("./routes/index");
const login = require("./routes/api/login");
const signup = require("./routes/api/signup");

const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/index");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to mongod server");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = require("express-session");
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: "hyeongju",
  resave: false,
  saveUninitialized: true
}));

app.use("/", index);
app.use("/login", login);
app.use("/signup", signup);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
