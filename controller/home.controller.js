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
      .custom(value => value === req.body.confirm).run(req);

    console.log(1);
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      console.log(2);
      next(createError(validateError.status));
      return;
    }

    console.log(3);
    const { username, email, password } = req.body;
    const result = await new User({ username, email, password }).save();
    console.log(4);
    console.log(result);
    res.redirect('/login');
  } catch (err) {
    // res.render('partial/message', {
    //   message: '이미 가입된 계정입니다',
    // });
  }
};

exports.login = (req, res, next) => {
  res.render('partial/login');
};
