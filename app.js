require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const homeRouter = require('./routes/home');
const signupRouter = require('./routes/signup');
const usersRouter = require('./routes/users');

const app = express();

require('./config/mongoose');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 5 },
  store: new MongoStore({ url: process.env.MONGODB_URI })
}));

app.use('/', homeRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);

// 이상한 url일 때 대응해주는 에러
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
