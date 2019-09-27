const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');
const sass = require('node-sass-middleware');

const index = require('./routes/index');
const login = require('./routes/login');
const votings = require('./routes/votings');
const users = require('./routes/users');
const passportConfig = require('./config/passport');
const methodOverride = require('method-override');

require('dotenv').config();
const DATABASE_URI = process.env.DATABASE_URI;
const SESSION_COOKIE_KEY = process.env.SESSION_COOKIE_KEY;

mongoose.connect(
  DATABASE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log('connected to mongodb');
  }
);

const app = express();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  sass({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/stylesheets'
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cookieSession({
    keys: [SESSION_COOKIE_KEY],
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/votings', votings);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
