const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('./db');

const app = express();

db();
require('./passportConfig');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const homeRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const signupRouter = require('./routes/signup');
const votingsRouter = require('./routes/votings');
const myVotingsRouter = require('./routes/my-votings');

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/votings', votingsRouter);
app.use('/my-votings', myVotingsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {
    status: err.status,
    message: err.message
  });
});

module.exports = app;
