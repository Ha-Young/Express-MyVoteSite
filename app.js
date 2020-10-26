const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const path = require('path');
const index = require('./api/routes/index');
const myVotings = require('./api/routes/myVoting');
const voting = require('./api/routes/voting');

var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/my-votings', myVotings);
app.use('/voting', voting);

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
