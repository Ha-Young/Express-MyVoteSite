const express = require("express");
const { HOME } = require("../../config/routes");

const authRoute = require("./auth");
const HomeController = require("./controller/home");

module.exports = function () {
  const app = express.Router();

  app.get(HOME, HomeController.home);

  authRoute(app);

  return app;
};
