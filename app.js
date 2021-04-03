require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");


const index = require("./routes/index");
const login = require("./routes/api/login");
const logout = require("./routes/api/logout");
const signup = require("./routes/api/signup");
const votings = require("./routes/votings");
const myVotings = require("./routes/myVotings");

const bodyParser = require("body-parser");

const app = express();

const connectDatabase = require("./config/database");
const configureSession = require("./lib/passport");

connectDatabase();
configureSession(app);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", index);
app.use("/login", login);
app.use("/logout", logout);
app.use("/signup", signup);
app.use("/votings", votings);
app.use("/my-votings", myVotings);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  const isLoggedIn = req.body.passport ? true : false;
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", { isLoggedIn: isLoggedIn });
});

module.exports = app;
