const passport = require('passport');
const { validationResult } = require('express-validator');

const UserService = require('../services/user');

const ROUTES = require('../constants/routes');
const VIEWS = require('../constants/views');
const { googleAuth } = require('../config');

exports.getSignup = (req, res, next) => {
  if (req.user) return res.redirect(ROUTES.HOME);

  return res.render(VIEWS.SIGNUP, { title: 'Sign Up' });
};

exports.postSignup = async (req, res, next) => {
  const validationErrors = validationResult(req).array();
  const { body: userInputs } = req;

  if (validationErrors.length) {
    return res.render(VIEWS.SIGNUP, { title: 'Sign Up', userInputs, validationErrors });
  }

  try {
    const userInstance = new UserService(userInputs);
    await userInstance.signup(userInputs);
    next();
  } catch (error) {
    next(error);
  }
};

exports.getLogin = (req, res, next) => {
  if (req.user) return res.redirect(ROUTES.HOME);

  return res.render(VIEWS.LOGIN, { title: 'Login' });
};

exports.postLogin = (req, res, next) => {
  const {
    body: userInputs,
    session: { referer },
  } = req;

  const authCallback = (error, authenticatedUser, validationError) => {
    if (error) return next(error);

    if (!authenticatedUser) {
      return res.render(VIEWS.LOGIN, { title: 'Login', userInputs, validationError });
    }

    req.logIn(authenticatedUser, error => {
      if (error) return next(error);

      res.redirect(referer || ROUTES.HOME);
      delete req.session.referer;
    });
  };

  passport.authenticate('local', authCallback)(req, res, next);
};

exports.getGoogleLogin = passport.authenticate('google', {
  scope: googleAuth.scope,
});

exports.getGoogleCallback = passport.authenticate('google', {
  failureRedirect: ROUTES.LOGIN,
});

exports.successGoogleLogin = (req, res, next) => {
  const { referer } = req.session;
  res.redirect(referer || ROUTES.HOME);
  delete req.session.referer;
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(error => {
    if (error) return next(error);

    req.logout();
    return res.redirect(ROUTES.HOME);
  });
};
