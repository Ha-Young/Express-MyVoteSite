const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const app = express();
const bodyParser = require('body-parser');

// Passport Config
const passport = require('passport');
require('./config/passport')(passport);

// dotenv Config
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// DB Config
const dbUrl = require('./config/keys').mongoURI;

// Import helpers
const { weekInMilliseconds } = require('./helpers');

// Connect to MongoDB
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(error => console.error(error));

// EJS
app.use(express.static(__dirname));
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: weekInMilliseconds },
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/homepage.js'));
app.use('/users', require('./routes/users.js'));
app.use('/polls', require('./routes/polls.js'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('catch 404 and forward to error handler');
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((error, req, res, next) => {
  console.error(error.status, error.message, error.stack);
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  error.status = error.status || 500;
  res.status(err.status || 500);
  res.render('error', { error });
});

module.exports = app;
