require("dotenv").config();
require("./db");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const index = require("./routes/index");
const auth = require("./routes/auth");
const votings = require("./routes/votings");
const myVotings = require("./routes/myVotings");
const errorController = require("./routes/controllers/errorController");

const AppError = require("./utils/AppError");
const deserializeUser = require("./utils/deserializeUser");
const authenticateUser = require("./utils/authenticateUser");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", path.join(__dirname, "views/layout"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(deserializeUser);
app.use("/", index);
app.use("/auth", auth);
app.use("/votings", authenticateUser, votings);
app.use("/my-votings", authenticateUser, myVotings);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new AppError("Page Not Found.", 404));
});

// error handler
app.use(errorController);

module.exports = app;
