require('dotenv').config();
require('./config/db');

const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

const mongoose = require('mongoose');
const createError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const votingsRouter = require('./routes/votings');

const { ROUTES, VIEWS, HOUR } = require('./config/constants');

const app = express();
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  databaseName: 'voting-platform-toggo',
  collection: 'session'
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    maxAge: HOUR,
    store
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(ROUTES.HOME, indexRouter);
app.use(ROUTES.AUTH, authRouter);
app.use(ROUTES.VOTINGS, votingsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (err instanceof mongoose.Error) err = createError(500);
    err.stack = null;
  }

  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.status || 500);
  res.render(VIEWS.ERROR);
});

app.listen(function () {
  console.log(`[Sever] Listening ${process.env.PORT || '3000'}`);
});

module.exports = app;
