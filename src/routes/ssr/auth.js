const { Router } = require("express");
const { logger } = require("../../loaders/logger");

// const AuthService = require('../../services/auth');
// const middlewares = require('../middlewares');
const AuthController = require("./controller/auth");
const { HOME, SIGNUP, LOGIN } = require("../../config/routes");

const route = Router();

module.exports = app => {
  app.use(HOME, route);

  route.get(SIGNUP, AuthController.login);
  route.get(LOGIN, AuthController.signup);
};
