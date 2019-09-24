const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const index = require('./routes/index');

const app = express();

require('./config/passport');
require('dotenv').config({ path: '.env' });

mongoose.connect(process.env.DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connection'));

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('asdsadasdsdasdasd'));

app.use(session({
  secret: 'asdsadasdsdasdasd',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(validator());

// Gloval vars
/*app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.success_massage = req.flash('success_msg');
  res.locals.error = req.flash('error');
  //res.locals.currentPath = req.path;
  next();
});*/

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
