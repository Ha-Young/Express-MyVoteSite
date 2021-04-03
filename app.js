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

const global = require("./routes/global");
const voting = require("./routes/voting");

const { ErrorHandler } = require("./util/error");
const { SERVER_ERROR } = require("./constants/error");
const { TIME } = require("./constants/time");

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
  cookie: { maxAge: TIME.SECONDS * TIME.MINETES * TIME.SECOND },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB_URL,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", global);
app.use("/votings", voting);

app.use((req, res, next) => {
  next(new ErrorHandler(404, SERVER_ERROR.NOT_FOUND));
});

app.use((err, req, res) => {
  res.locals.message = err.status ? err.name : SERVER_ERROR.INTERNAL_SERVER_ERROR;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
