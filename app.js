require("dotenv").config();

require("./loader/db");
require("./loader/passport");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const flash = require("connect-flash");

const index = require("./routes/index");
const voting = require("./routes/voting");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

app.set("layout", "layout");

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB_URL,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", index);
app.use("/votings", voting);

app.use((req, res, next) => {
  next(404);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
