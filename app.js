require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport');
const createError = require('http-errors');
const path = require('path');
const methodOverride = require('method-override');
const index = require('./routes/index');
const signup = require('./routes/signup');
const login = require('./routes/login');
const votings = require('./routes/votings');
const my_votings = require('./routes/my_votings');

mongoose.connect(process.env.DB_ADDRESS, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});

const app = express();

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/votings', votings);
app.use('/my-votings', my_votings);
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

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
