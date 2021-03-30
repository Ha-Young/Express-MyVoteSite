const passport = require("passport");

function renderLogin(req, res) {
  res.status(200).render('login');
}

function logout(req, res) {
  req.logOut();
  req.session.destroy();
  res.status(301).redirect('/');
}

function getGithubAuth(req, res) {
  passport.authenticate('github', { scope: [ 'user:email' ] });
}

function getGithubAuthCallback(rea, res) {
  res.status(301).redirect('/home');
}

exports.renderLogin = renderLogin;
exports.logout = logout;
exports.getGithubAuth = getGithubAuth;
exports.getGithubAuthCallback = getGithubAuthCallback;
