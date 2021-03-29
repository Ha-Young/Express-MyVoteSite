const createError = require('http-errors');

const User = require('../models/User');
//const catchAsync = require('../middlewares/catchAsync');
const validateEmail = require('../utils/validateEmail');

exports.getLoginForm = (req, res) => {
  const title = 'Log In';
  const message = req.flash('error');

  res.render('login', {
    title,
    message,
  });
};

exports.getSignUpForm = (req, res) => {
  const title = 'Sign Up';
  const message = req.flash('info');

  res.render('signup', {
    title,
    message,
  });
};

exports.createUser = async (req, res, next) => {
  try {
    if (!validateEmail(req.body.email)) {
      req.flash('info', 'please type valid email');
      return res.redirect('/auth/signup');
    }

    if (await User.findOne({ email: req.body.email })) {
      req.flash('info', 'email already exist');
      return res.redirect('/auth/signup');
    }

    if (await User.findOne({ username: req.body.username })) {
      req.flash('info', 'username already exist');
      return res.redirect('/auth/signup');
    }

    const user = await User.create(req.body);

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.redirect('/');
    });
  } catch (err) {
    next(createError(500));
  }
};

exports.logOut = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};
