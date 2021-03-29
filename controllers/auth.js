const passport = require("passport");

function getLogin(req, res, next) {
  res.status(200).render('index', { title: 'login' });
}

function getGithubAuth(req, res, next) {
  passport.authenticate('github', { scope: [ 'user:email' ] });
}

function getGithubAuthCallback(rea, res, next) {
  res.redirect('/home');
}

exports.getLogin = getLogin;
exports.postLogin = authenticate;
exports.logout = logout;
