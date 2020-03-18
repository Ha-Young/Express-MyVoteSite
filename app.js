require('dotenv').config();
const express = require('express');
const path = require('path');
const error = require('./lib/error');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport/passport.js');
const index = require('./routes/index');
const signup = require('./routes/signup');
const auth = require('./routes/auth');
const votings = require('./routes/votings');
const mongoose = require('mongoose');
const db = mongoose.connection;

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
  })
);
passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', index);
app.use('/signup', signup);
app.use('/auth', auth);
app.use('/votings', votings);

app.use(function(req, res, next) {
  next(new error.PageNotFoundError());
});

app.use(function(err, req, res, next) {
  // console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
