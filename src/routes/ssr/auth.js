const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { render } = require("ejs");
const { Router } = require("express");

// const middlewares = require('../middlewares');
const { HOME, SIGNUP, LOGIN, LOGOUT } = require("../../config/routes");
const authService = require("../../services/authService");
const { jwtCookieKey, jwtExpires } = require("../../config");

const route = Router();

module.exports = app => {
  app.use(HOME, route);

  route.get(SIGNUP, (req, res) => {
    res.render("signup");
  });

  route.get(LOGIN, (req, res) => {
    res.render("login");
  });

  route.post(
    LOGIN,
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const { user, token } = await authService.SignIn(email, password);

        authSuccess({ res, user, token });
      } catch (e) {
        return next(createError(e));
      }
    }
  );

  route.post(
    SIGNUP,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { user, token } = await authService.SignUp(req.body);

        authSuccess({ res, user, token });
        return res.render("index", { user });
      } catch (e) {
        return next(e);
      }
    }
  );

  // route.post(LOGOUT, middlewares.isAuth, (req, res, next) => {
  //   try {
  //     return res.status(200).end();
  //   } catch (e) {
  //     return next(e);
  //   }
  // });
};

function authSuccess({ res, user, token }) {
  res.cookie(jwtCookieKey, token, {
    maxAge: jwtExpires,
    httpOnly: true,
  });

  res.render("index", { user });
}
