const createError = require('http-errors');
const express = require('express');

const initLoaders = require('./loaders');

const indexRouter = require('./routes/index');
const votingsRouter = require('./routes/votings');

const app = express();

initLoaders(app);

app.use('/', indexRouter);
app.use('/votings', votingsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
