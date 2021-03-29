const createError = require('http-errors');

exports.signup = function (req, res, next) {
  res.render('partial/signup', {
    title: 'Voting Platform',
    message: req.session.username
  });
};

exports.result = function (req, res, next) {
  res.redirect('login');
};

exports.login = function (req, res, next) {
  res.render('login');
};
