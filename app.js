const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const setLocals = require('./configs/setLocal');
const passportConfig = require('./configs/passport');
const indexRouter = require('./routes/index');
const votingRouter = require('./routes/votings');

const app = express();

mongoose.connect('mongodb://localhost/voting-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
    secret: 'qwer',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: 'mongodb://localhost/voting-platform',
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
