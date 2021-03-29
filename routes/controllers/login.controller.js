const passport = require('passport');

exports.get = (req, res, next) => {
  res.render('login');
};

exports.postLocal = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.getGithub = passport.authenticate('github', {
  scope: ['user:email']
});

exports.callbackGithub = passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});