require("dotenv").config();
require("./passport");

const fs = require("fs");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const clientPromise = require("./db");
const path = require("path");
const helmet = require("helmet");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const rootRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const votingRouter = require("./routes/votings");
const { localMiddleware } = require("./middlewares/localMiddleware");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    clientPromise,
    collectionName: "sessions",
  }),
}));

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
switch (process.env.NODE_ENV) {
  case "production":
    app.use(logger("combined", { stream: accessLogStream }));
    break;
  case "development":
    app.use(logger("dev"));
    break;
  default:
    app.use(logger("combined", { stream: accessLogStream }));
}
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(localMiddleware);

app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/votings", votingRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
