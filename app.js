const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github').Strategy;

const indexRouter = require('./routes/index');
const votingRouter = require('./routes/votings');

const GITHUB_CLIENT_ID = '7acf82748836a7bf4dd0';
const GITHUB_CLIENT_SECRET = 'dd5a4751b0f09d02a0106054f7d92715a9f1dbb6';
const SECRET_CODE = 'abcde';

const app = express();

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback',
},
((accessToken, refreshToken, profile, cb) => cb(null, {
  profileId: profile.id,
  userName: profile.username,
}))));

app.use(session({
  secret: SECRET_CODE,
  resave: false,
  saveUninitialized: false,
}));

passport.serializeUser((userInfo, done) => {
  done(null, userInfo);
});
passport.deserializeUser((userInfo, done) => {
  done(null, userInfo);
});

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/voting', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use('/votings', votingRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  let preUrl;
  if (req.url.includes('/login')) {
    preUrl = req.url.split('/login')[1];
    return res.render('login', { preUrl });
  }

  if (req.url.includes('/auth/github')) {
    preUrl = req.url.split('/auth/github')[1];
    passport.authenticate('github', {
      failureRedirect: '/login',
      successRedirect: preUrl,
    });
  }
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
