const mongoose = require('mongoose');
const express = require('express');

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const setPassport = require('./config/passport');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');

const app = express();

const db = mongoose.connection;
const MONGODB_SERVER_URL = 'mongodb://localhost:27017/votingplatform';

mongoose.connect(MONGODB_SERVER_URL);

db.on('error', function() {
  console.error.bind(console, 'connection error:');
});

db.once('open', function() {
  console.log('mongo DB connected!');
});

setPassport(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', indexRouter);

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
