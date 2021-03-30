const createError = require('http-errors');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

exports.getMain = (req, res, next) => {
  const sess = req.session;
  res.render('main', {
    username: sess.username,
  });
};

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
    await new User({ username, email, password }).save();
    res.redirect('/login');
  } catch (err) {
    res.render('partial/message', {
      message: '이미 가입된 계정입니다',
    });
  }
};

exports.login = (req, res, next) => {
  res.render('partial/login');
};
