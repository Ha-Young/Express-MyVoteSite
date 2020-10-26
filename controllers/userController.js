const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const routes = require('../constants/routes');

exports.getSignUp = (req, res, next) => {
  res.render('signup');
};

exports.postSignUp = async (req, res, next) => {
  const { email, password, 'password-confirm': passwordConfirm } = req.body;
  const userData = { email, password, passwordConfirm };

  if (password !== passwordConfirm) {
    res.render('signup', {
      ...userData,
      error: '비밀번호를 일치시켜주세요.',
    });
    return;
  }

  try {
    const userData = await User.findOne({ email });

    if (userData) {
      res.render('signup', {
        userData,
        error: '동일한 이메일이 존재합니다.',
      });

      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const hasedPassword = await bcrypt.hash(password, 10);
    userData.password = hasedPassword;
  } catch (err) {
    next(err);
    return;
  }

  try {
    await User.create(userData);
  } catch (err) {
    next(err);
    return;
  }

  res.redirect(routes.home);
};

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

exports.logout = (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) return next(err);
  });

  req.logout();
  res.redirect(routes.home);
};
