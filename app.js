require('dotenv').config();

const express = require('express');
const createError = require('http-errors');

const path = require('path');
const bcrypt = require('bcrypt');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const votingsRouter = require('./routes/votings');
const User = require('./models/User');

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  }, async (username, password, done) => {
  try {
    console.log(username);
    const user = await User.findOne({ email: username });
    if (!user) {
      console.log('email is wrong');
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      console.log('password is wrong');
      return done(null, false, { message: 'Incorrect password.' });
    }
    console.log('login succeed');
    return done(null, user);
  } catch (error) {
    if (error) {
      console.log('login failed');
      return done(error);
    }
  }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true 
}));
// app.use(cookieSession({
//   name: 'session',
//   keys: process.env.COOKIE_SECRET,
//   maxAge: 24 * 60 * 60 * 1000
// }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/votings', votingsRouter);

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
