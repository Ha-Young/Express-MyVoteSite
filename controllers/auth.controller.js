const createError = require('http-errors');

const User = require('../models/User');
const { validateSignUpInputs } = require('../utils/validateInputs');

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
  const messages = req.flash('info');

  res.render('signup', {
    title,
    messages
  });
};

exports.createUser = async (req, res, next) => {
  try {
    const { error, value } = validateSignUpInputs(req.body);

    if (error) {
      req.flash('info', error.details.map(err => err.message));
      return res.redirect('/auth/signup');
    }

    const user = await User.create(value);

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
