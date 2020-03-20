require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('req-flash');

const homeRouter = require('./routes/home');
const signupRouter = require('./routes/signup');
const authRouter = require('./routes/auth');
const votingRouter = require('./routes/voting');
const myVotingRouter = require('./routes/myVotings');

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
  cookie: { maxAge: 1000 * 60 * 30 },
  store: new MongoStore({ url: process.env.MONGODB_URI })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/signup', signupRouter);
app.use('/auth', authRouter);
app.use('/', homeRouter);
app.use('/votings', votingRouter);
app.use('/my-votings', myVotingRouter);

app.use((req, res, next) => {
  next(new errors.InvalidUrlError('Invalid url.'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.displayMessage;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
