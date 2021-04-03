const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const passport = require("passport");

const authService = require("../../services/authService");
const { jwtCookieKey, jwtExpires } = require("../../config").jwt;
const {
  PREFIX,
  SIGNUP,
  LOGIN,
  LOGOUT,
  LOGIN_GOOGLE,
  LOGIN_GOOGLE_REDIRECT,
} = require("../../config/routes").AUTH;

const route = Router();

module.exports = app => {
  app.use(PREFIX, route);

  route.get(LOGIN, (req, res) => {
    const query = req.query || {};
    query.prevPathname = query.prevPathname || "";

    res.render("login", { user: req.user || {}, query, error: {} });
  });

  route.post(
    LOGIN,
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        prevPath: Joi.string().allow(""),
      }),
    }),
    async (req, res, next) => {
      try {
        const { email, password, prevPath } = req.body;
        const { token, error } = await authService.SignIn(email, password);

        if (error) {
          return res.render("login", { error });
        }

        authSuccess({ res, token, prevPath });
      } catch (err) {
        return next(createError(err));
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

  route.get(
    LOGIN_GOOGLE,
    (req, res, next) => {
      const prevPath = req.query.prevPath || "";
      req.session.prevPath = prevPath;
      next();
    },
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );

  route.get(
    LOGIN_GOOGLE_REDIRECT,
    passport.authenticate("google", { session: false }),
    async (req, res) => {
      const userInputDTO = {
        name: req.user.displayName,
        email: req.user._json.email,
        provider: req.user.provider,
      };

      const { token, error } = await authService.SocialLogin(userInputDTO);

      if (error) {
        return res.render("login", { error });
      }

      const prevPath = req.session.prevPath || "";

      req.session.destroy();

      authSuccess({ res, token, prevPath });
    }
  );

  route.post(LOGOUT, (req, res, next) => {
    try {
      res.clearCookie(jwtCookieKey);
      return res.redirect("/login");
    } catch (err) {
      return next(err);
    }
  });
};

function authSuccess({ res, token, prevPath }) {
  res.cookie(jwtCookieKey, token, {
    maxAge: jwtExpires,
  });

  if (prevPath) {
    return res.redirect(prevPath);
  }

  res.redirect("/");
}
