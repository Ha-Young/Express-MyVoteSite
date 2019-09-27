const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');
const sass = require('node-sass-middleware');
require('dotenv').config();

const connect = require('./schemas');

const index = require('./routes/index');
const login = require('./routes/login');
const auth = require('./routes/auth');
const passportConfig = require('./passport');
const register = require('./routes/register');
const votings = require('./routes/votings');

const app = express();
passportConfig(passport);
connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  sass({
    src: path.join(__dirname, 'public/stylesheets'),
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/stylesheets'
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/login', login);
app.use('/register', register);
app.use('/votings', votings);

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
