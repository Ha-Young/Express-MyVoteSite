if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const sass = require('node-sass-middleware');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const flash = require('connect-flash');
const index = require('./routes/index');
const auth = require('./routes/auth');
const votings = require('./routes/votings');
passportConfig(passport);

var app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected!');
});

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24000 * 60 * 60 * 7
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  sass({
    src: ('public/stylesheets'),
    dest: ('public/stylesheets'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/stylesheets'
  })
);
app.use(express.static('public'));

app.use('/', index);
app.use('/auth', auth);
app.use('/votings', votings);

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
