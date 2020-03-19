module.exports = {
  renderSignUp(req, res, next) {
    if (req.isAuthenticated()) {
      res.render('signup', { hasLoggedIn: true });
    } else {
      res.render('signup', { hasLoggedIn: false });
    }
  },
  redirectMain(req, res, next) {
    res.redirect('/');
  },
};
