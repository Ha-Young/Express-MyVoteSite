require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();
require('./config/database');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('./config/passport')(passport);
const index = require('./routes/index');
const votings = require('./routes/votings');
const myVotings = require('./routes/myVotings');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/votings', votings);
app.use('/my-votings', myVotings);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
