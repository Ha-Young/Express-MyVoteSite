const passport = require('passport');

exports.login = (req, res) => {
  let flashMessage = req.flash();
  let feedback = '';
  if (flashMessage.error) {
    feedback = flashMessage.error[0];
  }
  res.render('login', { error: feedback });
};

exports.signup = (req, res) => {
  let flashMessage = req.flash();
  let feedback = '';
  if (flashMessage.error) {
    feedback = flashMessage.error[0];
  }
  res.render('signup', { error: feedback });
};

exports.loginLocal = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
  successFlash: true
});

exports.loginGithub = passport.authenticate('github');

exports.githubCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  sucessRedirect: '/'
});

exports.logout = (req, res) => {
  req.logOut();
  res.status(301).redirect('/login');
};
