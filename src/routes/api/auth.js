const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { Router, json } = require("express");

const authService = require("../../services/authService");
const { AUTH } = require("../../config/routes").API;

const route = Router();

module.exports = app => {
  app.use(AUTH.PREFIX, route);

  route.post(
    AUTH.SIGNIN,
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
          return res.json({ error });
        }

        res.json({ token, error });
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
          return res.json({ error });
        }

        json({ user, token, error });
        return res.json({ user, token, error });
      } catch (err) {
        return next(err);
      }
    }
  );
};
