const createError = require('http-errors');

const User = require('../models/User');

exports.getLoginForm = (req, res) => {
  const title = 'Log In';
  const infoMessages = req.flash('info');
  const message = req.flash('error');

  res.render('login', {
    title,
    infoMessages,
    message
  });
};

exports.getSignUpForm = (req, res) => {
  const title = 'Sign Up';
  const infoMessages = req.flash('info');
  const message = req.flash('error');

  res.render('signup', {
    title,
    infoMessages,
    message
  });
};

exports.createUser = async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;
    const user = await User.create({ email, nickname, password });

    req.login(user, err => {
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
