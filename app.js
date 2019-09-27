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

const mainRouter = require('./routes/main');
const votingRouter = require('./routes/main');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const app = express();
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_SERVER_URL, {
  useFindAndModify: false
});

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'SECRET',
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', mainRouter);
app.use('/votings', votingRouter);

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
  err.status = err.status || 500;
  if (err.status === 500) {
    err.message = 'Internal Server Error';
  }

  res.status(err.status);
  res.render('error', err);
});

module.exports = app;
