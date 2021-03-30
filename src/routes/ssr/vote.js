const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");

// const middlewares = require('../middlewares');
const { PREFIX, DETAIL, ERROR, NEW, SUCCESS } = require("../../config/routes").VOTE;
const isLogin = require("../middlewares/isLogin");

const route = Router();

module.exports = app => {
  app.use(PREFIX, isLogin, route);

  route.get(NEW, (req, res) => {
    res.render("voteCreate");
  });
};
