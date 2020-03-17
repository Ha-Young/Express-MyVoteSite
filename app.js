const createError = require('http-errors');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const bodyParser = require('body-parser')
const express = require('express');
const session = require('express-session');
const passport = require('passport');
// const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;

const index = require('./routes/index');
const signup = require('./routes/signup');

const app = express();

require('./config/mongoose');
// require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(session({
  secret: 'nathan',
  resave: false,
  saveUninitialized: true,
}));
 
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

app.use('/', index);
app.use('/signup', signup);

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
