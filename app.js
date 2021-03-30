require("dotenv").config();
require("./database/db");

const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

// view engine setup
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  maxAge: 2 * 60 * 60 * 1000,
  store: new MongoDBStore({
    uri: process.env.MONGODB_ATLAS_URI,
    collection: "_sessions",
  }),
}));

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const indexRouter = require("./routes/index");

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
