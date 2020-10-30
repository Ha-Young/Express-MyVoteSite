const passport = require('passport');
const { validationResult } = require('express-validator');

const ROUTES = require('../constants/routes');
const VIEWS = require('../constants/views');
const { googleAuth } = require('../config');

const User = require('../models/User');

exports.getSignup = (req, res, next) => {
  const { user } = req;
  if (user) return res.redirect(ROUTES.HOME);
  res.render(VIEWS.SIGNUP, { title: 'Sign Up' });
};

exports.postSignup = async (req, res, next) => {
  const validationErrors = validationResult(req).array();
  const { displayName, email, password } = req.body;

  if (validationErrors) {
    return res.render(VIEWS.SIGNUP, {
      title: 'Sign Up',
      displayName,
      email,
      validationErrors,
    });
  }

  try {
    const user = await User({ displayName, email });
    await User.register(user, password);
    next();
  } catch (err) {
    next(err);
  }
};

exports.getLogin = (req, res, next) => {
  const { user } = req;
  if (user) return res.redirect(ROUTES.HOME);
  res.render(VIEWS.LOGIN, { title: 'Login' });
};

exports.postLogin = (req, res, next) => {
  const { referer } = req.session;

  passport.authenticate(
    'local',
    (error, authenticatedUser, validationError) => {
      if (error) return next(error);

      if (!authenticatedUser) {
        return res.render(VIEWS.LOGIN, { title: 'Login', validationError });
      }

      req.logIn(authenticatedUser, error => {
        if (error) return next(error);

        res.redirect(referer || ROUTES.HOME);
        delete req.session.referer;
      });
    }
  )(req, res, next);
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
  if (req.session) {
    req.session.destroy(err => {
      if (err) return next(err);
      req.logout();
      return res.redirect(ROUTES.HOME);
    });
  }
};
