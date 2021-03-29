const { Router } = require("express");

// const middlewares = require('../middlewares');
const { HOME, SIGNUP, LOGIN } = require("../../config/routes");

const route = Router();

module.exports = app => {
  app.use(HOME, route);

  route.get(SIGNUP, (req, res) => {
    res.render("signup");
  });

  route.get(LOGIN, (req, res) => {
    res.render("login");
  });
};
