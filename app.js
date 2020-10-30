const createError = require('http-errors');
const express = require('express');

const initLoaders = require('./loaders');

const ROUTES = require('./constants/routes');
const globalRouter = require('./routes/global');
const votingsRouter = require('./routes/votings');

const app = express();

initLoaders(app);

app.use(ROUTES.VOTINGS_HOME, votingsRouter);
app.use(ROUTES.HOME, globalRouter);

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
