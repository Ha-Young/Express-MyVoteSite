require("dotenv").config();
require("./db");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");

const index = require("./routes/index");
const auth = require("./routes/auth");

const errorController = require("./routes/controllers/errorController");

const AppError = require("./utils/AppError");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", path.join(__dirname, "views/layout"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET,
}));
app.use(flash());
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
