require('dotenv').config();
require('./db');

const express = require('express');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const { localMiddleware } = require('./routes/middlewares/local');

const app = express(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passportConfig(passport);
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', localMiddleware, indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
