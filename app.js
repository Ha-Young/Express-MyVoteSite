require('dotenv').config();
require('./db');

const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

const mongoose = require('mongoose');
const createError = require('http-errors');
const logger = require('morgan');

const index = require('./routes/index');
const auth = require('./routes/auth');
const votings = require('./routes/votings');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', index);
app.use('/auth', auth);
app.use('/votings', votings);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err);

  if (process.env.NODE_ENV === 'production') {
    if (err instanceof mongoose.Error) err = createError(500);
    err.stack = null;
  }

  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.status || 500);
  res.render('error');
});

app.listen(function () {
  console.log(`[Sever] Listening ${process.env.PORT || '3000'} - env: ${process.env.NODE_ENV}`);
});

module.exports = app;
