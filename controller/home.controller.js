const createError = require('http-errors');
const { check, validationResult } = require('express-validator');

exports.getMain = (req, res, next) => {
  const sess = req.session;
  res.render('main', {
    username: sess.username,
  });
};

exports.signup = (req, res, next) => {
  res.render('partial/signup');
};

exports.post = async (req, res, next) => {
  await check('email').isEmail().run(req);
  await check('password')
    .custom(value => value === req.body.confirm).run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(createError(error.message));
  }
  res.redirect('/');
};

exports.login = (req, res, next) => {
  res.render('partial/login');
};
