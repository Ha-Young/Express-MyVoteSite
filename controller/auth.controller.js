const createError = require('http-errors');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = (req, res, next) => {
  res.render('partial/signup');
};

// eslint-disable-next-line consistent-return
exports.post = async (req, res, next) => {
  try {
    await check('email').isEmail().run(req);
    await check('password')
      .isLength({ min: 4 })
      .custom(value => value === req.body.confirm).run(req);

    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      const { msg, param } = validateError.errors[0];
      res.render('partial/message', {
        message: `${msg}: ${param}`,
      });
      return;
    }

    const { username, email, password } = req.body;
    const userData = await User.findOne({ email });

    if (userData) {
      res.render('partial/message', {
        message: '이미 가입된 계정입니다.',
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });
      if (newUser) {
        // success 보여주기
        console.log('success sign up');
        res.redirect('/auth/login');
      } else {
        // fail 보여주기
        console.log('signup failed');
      }
    }
  } catch (err) {
    // err.errors['_id'].message;
    next(createError(err.message));
  }
};

exports.login = async (req, res, next) => {
  const fmsg = req.flash();
  if (fmsg.error) {
    return res.render('partial/message', {
      message: '가입되지 않은 계정입니다.',
    });
  }
  return res.render('partial/login');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
