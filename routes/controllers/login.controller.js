const passport = require('passport');

exports.localPost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.githubGet = passport.authenticate('github', {
  scope: ['user:email']
});

exports.githubCallback = passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});
