const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const passport = require("passport");

const authService = require("../../services/authService");
const { jwtCookieKey, jwtExpires } = require("../../config").jwt;
const { AUTH } = require("../../config/routes").API;

const route = Router();

module.exports = app => {
  app.use(AUTH.PREFIX, route);

  route.post(
    AUTH.LOGIN,
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const { token, error } = await authService.SignIn(email, password);

        if (error) {
          return res.render("login", { error });
        }

        authSuccess({ res, token });
      } catch (err) {
        return next(createError(err));
      }
    }
  );

  route.post(
    AUTH.SIGNUP,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { user, token, error } = await authService.SignUp(req.body);

        if (error) {
          return res.render("login", { error });
        }

        authSuccess({ res, token });
        return res.render("index", { user });
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(AUTH.LOGIN_GOOGLE, passport.authenticate('google', { scope: ['profile','email'], session: false }));

  route.get(AUTH.LOGIN_GOOGLE_REDIRECT, passport.authenticate('google', { session: false }), async (req, res)=>{
    const userInputDTO = {
      name: req.user.displayName,
      email: req.user._json.email,
      provider: req.user.provider,
    };

    const { token, error } = await authService.SocialLogin(userInputDTO);

    if (error) {
      return res.render("login", { error });
    }

    authSuccess({ res, token });
  });
};

function authSuccess({ res, token }) {
  res.cookie(jwtCookieKey, token, {
    maxAge: jwtExpires,
    httpOnly: true,
  });

  res.redirect("/");
}
