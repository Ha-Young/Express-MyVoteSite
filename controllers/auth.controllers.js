/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {
  RESULT_MESSAGE,
  FILL_FORM,
  PASSWORD_LENGTH,
  PASSWORD_WRONG,
  USER_DUPLICATED,
  SUCCESS_SIGN_UP,
} = require('../constants/constants');

exports.getSignUp = (req, res, _next) => {
  res.render('index', {
    result_message: req.flash(RESULT_MESSAGE),
  });
};

exports.getLogIn = (req, res, _next) => {
  res.render('login', {
    result_message: req.flash(RESULT_MESSAGE),
  });
};

exports.registUser = async (req, res, next) => {
  let { email, userName, password, confirmPassword } = req.body;
  let message;

  if (!email || !userName || !password || !confirmPassword) {
    req.flash(RESULT_MESSAGE, FILL_FORM);
    res.redirect('/signup');
  }

  if (password.length < 7) {
    req.flash(RESULT_MESSAGE, PASSWORD_LENGTH);
    res.redirect('/signup');
  }

  if (password !== confirmPassword) {
    req.flash(RESULT_MESSAGE, PASSWORD_WRONG);
    res.redirect('/signup');
  }

  try {
    if (!message) {
      await User.findOne({ email: email }, (err, data) => {
        if (err) throw err;

        if (data) {
          req.flash(RESULT_MESSAGE, USER_DUPLICATED);
          res.redirect('/signup');
        }

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            password = hash;

            User({
              email,
              userName,
              password,
              verified: true,
            }).save((err, _data) => {
              if (err) throw err;

              req.flash(RESULT_MESSAGE, SUCCESS_SIGN_UP);

              res.redirect('/login');
            });
          });
        });
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.logInUser = (req, res, next) => {
  if (req.user) {
    req.session.redirectUrl = '/votings';
  }

  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: `${req.session.redirectUrl}`,
    failureFlash: true,
  })(req, res, next);
};

exports.logOut = (req, res, _next) => {
  req.logout();
  res.redirect('/login');
};
