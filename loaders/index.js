const config = require('../config');
const mongooseLoader = require('./mongoose');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const initLoaders = app => {
  if (process.env.NODE_ENV === 'development') {
    app.use(logger(config.logs.level));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
  }

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('views', path.join(config.rootDir, 'views'));
  app.set('view engine', 'pug');
  app.use(sassMiddleware(config.sass));

  app.use(express.static(path.join(config.rootDir, 'public')));

  app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

  mongooseLoader().then(mongooseConnection => {
    const store = new MongoStore({ mongooseConnection });
    app.use(session({ ...config.session, store }));
    app.use(passport.initialize());
    app.use(passport.session());
  });
};

module.exports = initLoaders;
