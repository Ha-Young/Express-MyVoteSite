const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

module.exports = (app, express) => {
  const middleware = [];

  middleware.push(cookieParser());
  middleware.push(express.json());
  middleware.push(express.urlencoded({ extended: false }));
  middleware.push(express.static(path.join(__dirname, 'public')));

  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger());
  }

  if (process.env.NODE_ENV === 'product') {
    middleware.push(helmet());
    middleware.push(compression());
  }

  middleware.forEach((module) => {
    app.use(module);
  });
};
