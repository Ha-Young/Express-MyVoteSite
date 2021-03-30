require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const helmet = require("helmet");
const path = require("path");

const sessionLoader = require("./loaders/session");
const passportLoader = require("./loaders/passport");
const loggerLoader = require("./loaders/logger");

const authRouter = require("./api/routes/auth");
const rootRouter = require("./api/routes/index");
const votingRouter = require("./api/routes/votings");

const { localMiddleware } = require("./api/middlewares/localMiddleware");
const { authenticated, isAuthenticated } = require("./api/middlewares/authenticator");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

sessionLoader(app);
passportLoader(app);
loggerLoader(app);

app.use(localMiddleware);

app.use("/auth",authenticated, authRouter);
app.use("/",isAuthenticated, rootRouter);
app.use("/votings",isAuthenticated, votingRouter);

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
