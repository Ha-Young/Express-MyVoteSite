const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
require('./middleware')(app, express);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  const error = new Error('404');
  error.statue = 404;
  next(error);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
