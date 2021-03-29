const { Router } = require("express");
const { celebrate, Joi } = require('celebrate');
const { logger } = require("../../loaders/logger");

const AuthService = require('../../services/auth');
const middlewares = require('../middlewares');
const { api } = require("../../config/routes");

const route = Router();

module.exports = app => {
  app.use(api.auth.prefix, route);

  route.post(
    api.auth.signup,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      try {
        const { user, token } = await AuthService.SignUp(req.body);
        return res.status(201).json({ user, token });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  route.post(
    api.auth.signin,
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { email, password } = req.body;
        const { user, token } = await AuthService.SignIn(email, password);
        return res.json({ user, token }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    }
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post(api.auth.logout, middlewares.isAuth, (req, res, next) => {
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};
