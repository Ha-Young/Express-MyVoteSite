const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');

const dbConfig = require('./config/db');
const passportConfig = require('./config/passport');
const index = require('./api/routes/index');
const votings = require('./api/routes/votings');
const {
  ROUTES_GLOBAL,
  ROUTES_VOTE,
} = require('./config/constants');

const app = express();
dotenv.config();
passportConfig();
dbConfig();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(ROUTES_GLOBAL.HOME, index);
app.use(ROUTES_VOTE.VOTINGS, votings);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
