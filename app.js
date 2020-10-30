require('./db');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const indexRouter = require('./routes/index');
const votingsRouter = require('./routes/votings');
const { SESSION_SECRET } = require('./config/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
const passportConfig = require('./config/passport-config');
passportConfig(passport);

app.use('/', indexRouter);
app.use('/votings', votingsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
