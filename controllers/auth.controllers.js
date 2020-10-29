/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getSignUp = (req, res, _next) => {
  res.render('index');
};

exports.getLogIn = (req, res, _next) => {
  res.render('login');
};

exports.registUser = async (req, res, next) => {
  let { email, userName, password, confirmPassword } = req.body;
  let message;

  if (!email || !userName || !password || !confirmPassword) {
    message = '양식을 모두 채워주세요';

    req.flash('error_message', message);
    res.redirect('/signup');
  }

  if (password.length < 7) {
    message = '비밀번호는 8자 이상 작성해주세요.';
    req.flash('error_message', message);
    res.redirect('/signup');
  }

  if (password !== confirmPassword) {
    message = '비밀번호가 일치하지 않습니다.';
    req.flash('error_message', message);
    res.redirect('/signup');
  }

  try {
    if (!message) {
      await User.findOne({ email: email }, (err, data) => {
        if (err) throw err;

        if (data) {
          message = '이미 가입된 유저가 있습니다.';
          req.flash('error_message', message);
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

              req.flash(
                'success_message',
                '회원가입을 축하합니다. 로그인을 진행해주세요',
              );

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
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/votings',
    failureFlash: true,
  })(req, res, next);
};

exports.logOut = (req, res, _next) => {
  req.logout();
  res.redirect('/login');
};
