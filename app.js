const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");

const CreateError = require("./utils/createError");
const globalErrorHandler = require("./controllers/errorController");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const votingsRouter = require("./routes/votings");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/", indexRouter);
app.use("/signup", authRouter);
app.use("/login", authRouter);
app.use("/votings", votingsRouter);

app.all("*", (req, res, next) => {
  next(new CreateError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
