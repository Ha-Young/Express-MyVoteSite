const createError = require('http-errors');

exports.signup = (req, res, next) => {
  res.render('partial/signup', {
    title: 'Voting Platform',
    message: req.session.username
  });
};

exports.result = (req, res, next) => {
  res.redirect('login');
};

exports.login = (req, res, next) => {
  res.render('login');
};
