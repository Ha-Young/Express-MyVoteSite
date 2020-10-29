const createError = require('http-errors');
const passport = require('passport');

const User = require('../models/User');

const { googleAuth } = require('../config');
const GLOBAL = require('../constants/routes');
const VIEWS = require('../constants/views');

exports.getSignup = (req, res, next) => {
  const { user } = req;
  if (user) return res.redirect(GLOBAL.HOME);
  res.render(VIEWS.SIGNUP, { title: 'Sign Up' });
};

exports.postSignup = async (req, res, next) => {
  const {
    body: { displayName, email, password, password2 },
  } = req;

  if (password !== password2) {
    return next(createError(400, 'Passwords do not match'));
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
  if (user) return res.redirect('/');
  res.render('login', { title: 'Login' });
};

exports.postLogin = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
});

exports.getGoogleLogin = passport.authenticate('google', {
  scope: googleAuth.scope,
});

exports.getGoogleCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/',
});

exports.getLogout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) return next(err);
      req.logout();
      return res.redirect('/');
    });
  }
};
