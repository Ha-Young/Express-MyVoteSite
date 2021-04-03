require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const pug = require('pug');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const passportSetup = require('./config/passport-setup');

mongoose.connect(
  process.env.MONGODB_URI,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected..');
});

const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');
const votingsRouter = require('./routes/votings');
const myPageRouter = require('./routes/myVotings');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 10 * 24 },
}));
app.use(flash());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/votings', votingsRouter);
app.use('/my-votings', myPageRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('message', {
    user: req.user,
    url: err.url,
    isRedirected: err.isRedirected,
    message: err.message,
  });
});

module.exports = app;
