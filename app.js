require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('express-flash');

const initDB = require('./configs/db');
const initGithubPassport = require('./loaders/githubPassport');
const initLocalPassport = require('./loaders/localPassport');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev')); // TODO ????
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./configs/session'));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

initDB();
initGithubPassport();
initLocalPassport();

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
