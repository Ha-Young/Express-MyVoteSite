require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const helmet = require("helmet");
const path = require("path");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const sessionLoader = require("./loaders/session");
const passportLoader = require("./loaders/passport");
const loggerLoader = require("./loaders/logger");

const rootRouter = require("./api/routes/rootRouter");
const authRouter = require("./api/routes/authRouter");
const votingRouter = require("./api/routes/votingsRouter");

const { localMiddleware } = require("./api/middlewares/localMiddleware");
const { loggedIn } = require("./api/middlewares/authenticator");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

sessionLoader(app);
passportLoader(app);
loggerLoader(app);
app.use(flash());

app.use(localMiddleware);

app.use("/", rootRouter);
app.use("/auth", loggedIn, authRouter);
app.use("/votings", votingRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", { pageTitle: "Error", err });
});

module.exports = app;
