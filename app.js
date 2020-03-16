require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const homeRouter = require('./routes/home');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

const errors = require('./lib/errors');

const app = express();

require('./config/mongoose');
require('./config/passport');
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 5 },
  store: new MongoStore({ url: process.env.MONGODB_URI })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

// 이상한 url일 때 대응해주는 에러
app.use((req, res, next) => {
  next(new errors.InvalidUrlError('Invalid url.'));
});







// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.displayMessage;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
