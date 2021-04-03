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
      return res.render('partial/message', {
        isSuccess: false,
        message: `${msg}: ${param}`,
      });
    }

    const { username, email, password } = req.body;
    const userData = await User.findOne({ email });

    if (userData) {
      return next(createError(401, {
        url: '/',
        isRedirected: false,
        message: '이미 가입된 계정입니다.',
      }));
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SECRET_KEY, 10),
    );
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return next(createError(401, {
        url: '/',
        isRedirected: false,
        message: '이미 가입된 계정입니다.',
      }));
    }
    return res.redirect('/auth/login');
  } catch (err) {
    return next(createError(500));
  }
};

exports.login = async (req, res, next) => {
  if (req.params.id) {
    return res.render('partial/login', { votingId: req.params.id });
  }

  const fmsg = req.flash();

  if (fmsg.error) {
    return next(createError(401, {
      url: '/',
      isRedirected: true,
      message: '가입되지 않은 계정입니다.',
    }));
  }
  return res.render('partial/login');
};

exports.result = async (req, res, next) => {
  if (req.body.votingId) {
    return res.redirect(`/votings/${req.body.votingId}`);
  }
  return res.redirect('/');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
