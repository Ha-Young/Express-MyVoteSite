const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

module.exports = (app) => {
  const middleware = [];

  middleware.push(cookieParser());
  middleware.push(express.json());
  middleware.push(express.urlencoded({ extended: false, }));
  middleware.push(express.static(path.join(__dirname, '../public')));
  middleware.push(session({
    secret: process.env.SESSION_SECRET_KET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
    store: new FileStore(),
  }));

  // eslint-disable-next-line no-empty
  if (process.env.NODE_ENV === 'development') {
  }

  if (process.env.NODE_ENV === 'product') {
    middleware.push(logger());
    middleware.push(helmet());
    middleware.push(compression());
  }

  middleware.forEach((module) => {
    app.use(module);
  });
};
