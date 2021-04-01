const createError = require('http-errors');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = (req, res, next) => {
  res.render('partial/signup');
};

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
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SECRET_KEY, 10),
      );
      const newUser = await User.create({ username, email, password: hashedPassword });

      if (newUser) {
        console.log('success sign up');
        res.redirect('/auth/login');
      } else {
        console.log('signup failed');
      }
    }
  } catch (err) {
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
