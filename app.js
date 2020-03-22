const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
require('dotenv').config();

const setLocals = require('./configs/setLocal');
const passportConfig = require('./configs/passport');
const indexRouter = require('./routes/index');
const votingRouter = require('./routes/votings');
const ERROR_STATUS = require('./constants/errorCode.js');

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false,
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: process.env.MONGO_URL,
      collection: 'sessions'
    })
  })
);
app.use(passportConfig);
app.use(passport.initialize());
app.use(passport.session());
app.use(setLocals);

app.use('/', indexRouter);
app.use('/votings', votingRouter);

app.use(function(req, res, next) {
  next(createError(404, { errorCode: 404 }));
});

app.use(function(err, req, res, next) {
  res.locals.message = ERROR_STATUS[err.errorCode] || ERROR_STATUS[999];
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
