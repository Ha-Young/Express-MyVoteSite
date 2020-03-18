require('dotenv').config();
require('./config/passport');
require('./config/mongoose');

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');

const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const votingRouter = require('./routes/votings');
const myVotingRouter = require('./routes/myVotings');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/votings', votingRouter);
app.use('/my-votings', myVotingRouter);

app.post('/login',
  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}
  // , (req, res) => {
  //   req.session.save()
  // }
))

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
