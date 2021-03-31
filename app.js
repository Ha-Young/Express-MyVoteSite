const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const CreateError = require("./utils/createError");
const globalErrorHandler = require("./controllers/errorController");
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const votingsRouter = require("./routes/votingRouter");
const checkTokenAuth = require("./middlewares/checkTokenAuth");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", /* checkTokenAuth , */ mainRouter);
app.use("/users", userRouter);
app.use("/votings", /* checkTokenAuth, */ votingsRouter);

app.all("*", (req, res, next) => {
  next(
    new CreateError(`다음 페이지를 찾을 수 없습니다. : ${req.originalUrl}`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
