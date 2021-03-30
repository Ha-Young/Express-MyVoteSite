const express = require("express");
const { HOME } = require("../../config/routes");
const isLogin = require("../middlewares/isLogin");

const authRoute = require("./auth");
const voteRoute = require("./vote");

module.exports = function () {
  const app = express.Router();

  app.get(HOME, isLogin, (req, res) => {
    res.render("index");
  });

  authRoute(app);
  voteRoute(app);

  return app;
};
