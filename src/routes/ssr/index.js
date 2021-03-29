const express = require("express");

const authRoute = require("./auth");

module.exports = function () {
  const app = express.Router();

  authRoute(app);

  return app;
};
