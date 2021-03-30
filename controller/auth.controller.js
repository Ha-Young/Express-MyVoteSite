const createError = require('http-errors');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

exports.signup = (req, res, next) => {
  console.log(req.session.passport.user);
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
        message: '이미 가입된 계정입니다',
      });
    } else {
      await User.create({ username, email, password });
      res.redirect('/auth/login');
    }
  } catch (err) {
    next(createError(err.message));
  }
};

exports.login = (req, res, next) => {
  res.render('partial/login');
};