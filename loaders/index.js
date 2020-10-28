const config = require('../config');
const mongooseLoader = require('./mongoose');
require('./passport');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const initLoaders = app => {
  if (process.env.NODE_ENV === 'development') {
    app.use(logger(config.logs.level));
  }

  // if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(helmet(config.helmet));
  // }

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('views', path.join(config.rootDir, 'views'));
  app.set('view engine', 'pug');
  app.use(sassMiddleware(config.sass));

  app.use(express.static(path.join(config.rootDir, 'public')));

  const mongooseConnection = mongooseLoader();
  const store = new MongoStore({ mongooseConnection });
  app.use(session({ ...config.session, store }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(require('./localsMiddleware'));
};

module.exports = initLoaders;
