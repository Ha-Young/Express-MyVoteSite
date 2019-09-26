const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('connected'));

const expire = 3600000 * 7 * 24;
const app = express();
const index = require('./routes/index');
const login = require('./routes/login');
const join = require('./routes/join');
const auth = require('./routes/auth');
const votings = require('./routes/votings');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: expire }
}));
require('./config/passport')(passport);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/join', join);
app.use('/auth', auth);
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
  res.render('error', { message: err });
});

module.exports = app;
