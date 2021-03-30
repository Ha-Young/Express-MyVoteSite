const createError = require('http-errors');
const express = require('express');
const path = require('path');
const status = require('statuses');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => console.log('Connected to mongoDB server'));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: "voting_platform"
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(require('./routes'));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // TODO if err가 createError로 생성된거면 그대로 로그 찍으면 안되고 메시지 바꿔서 찍어줘야함. joi에서 넘어오는 메시지 그대로 노출되면 안됨!
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
