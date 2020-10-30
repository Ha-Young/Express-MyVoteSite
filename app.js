if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { ROOT, VOTINGS } = require('./constants/urls');

const createError = require('http-errors');
const express = require('express');
require('./src/db')();
const passport = require('passport');
const session = require('express-session');

const path = require('path');
const logger = require('morgan');

const index = require('./routes/index');
const votings = require('./routes/votings');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
require('./src/passport')();

app.use(ROOT, index);
app.use(VOTINGS, votings);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
