const express = require("express");
const { HOME } = require("../../config/routes");

const authRoute = require("./auth");

module.exports = function () {
  const app = express.Router();

  app.get(HOME, (req, res) => {
    res.render("index");
  });

  authRoute(app);

  return app;
};
