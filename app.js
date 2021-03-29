const dotenv = require("dotenv");
dotenv.config({ path: "./.env"});

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser');
const logger = require("morgan");

const indexRouter = require("./routes/index");
const votingsRouter = require("./routes/votings/index");
const myVotingsRouter = require("./routes/my-votings");


const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
} else {
  app.use(logger("combined"));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/votings", votingsRouter);
app.use('/my-votings', myVotingsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: "Error", err});
});

module.exports = app;
