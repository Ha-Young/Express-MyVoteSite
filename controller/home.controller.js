const createError = require('http-errors');

exports.getMain = (req, res, next) => {
  const sess = req.session;
  res.render('main', {
    username: sess.username,
  });
};

exports.signup = (req, res, next) => {
  res.render('partial/signup');
};

exports.result = (req, res, next) => {
  console.log(req.body);
  // res.redirect('login');
};

exports.login = (req, res, next) => {
  res.render('partial/login');
};
