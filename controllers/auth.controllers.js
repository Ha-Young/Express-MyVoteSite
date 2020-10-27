/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { isValidEmail } = require('../utils/util');

exports.flashMessage = (req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
};

exports.registerUser = async (req, res, _next) => {
  let { email, userName, password, confirmPassword } = req.body;
  console.log(req.body.userName);
  let message;

  if (!email || !userName || !password || !confirmPassword) {
    message = '양식을 모두 채워주세요.';
    res.render('index', { err: message });
  }

  if (password.length < 7) {
    message = '비밀번호는 문자 숫자의 조합으로 8자 이상 작성해주세요.';
    res.render('index', { err: message });
  }

  if (password !== confirmPassword) {
    message = '비밀번호가 일치하지 않습니다.';
    res.render('index', {
      err: message,
      email: email,
      username: userName
    });
  }

  if (!isValidEmail(email)) {
    message = '유효한 이메일을 적어주세요';
    res.render('index', {
      err: message,
      email: email,
      username: userName
    });
  }

  if (!message) {
    await User.findOne({ email: email }, (err, data) => {
      if (err) throw err;
      if (data) {
        err = '이 이메일을 사용한 다른 사용자가 있습니다.';
        res.render('index', {
          err: err,
          email: email,
          username: userName,
        });
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
          }).save((err, _data) => {
            if (err) throw err;
            req.flash(
              'success_message',
              '회원가입을 축하합니다. 로그인을 진행해주세요'
            );
            res.redirect('/login');
          });
        });
      });
    });
  }
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/votings',
    failureFlash: true,
  })(req, res, next);
};

exports.logOut = (req, res) => {
  req.logout();
  res.redirect('/login');
};
