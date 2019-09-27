var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var methodOverride = require("method-override");
var flash = require("connect-flash");
var lessMiddleware = require('less-middleware');
require("dotenv").config();

var connect = require("./schemas");

var app = express();
connect();

// view engine setup
app.use(lessMiddleware(__dirname + '/public'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
  })
);
app.use(flash());
var passport = require("./passport")(app);

const index = require("./routes/index");
const login = require("./routes/login")(passport);
const logout = require("./routes/logout");
const register = require("./routes/register");
const votings = require("./routes/votings");

app.use("/", index);
app.use("/login", login);
app.use("/logout", logout);
app.use("/register", register);
app.use("/votings", votings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
