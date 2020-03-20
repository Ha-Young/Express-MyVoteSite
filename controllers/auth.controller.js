const passport = require('passport');

exports.getLoginPage = function(req, res) {
  res.render('login');
};

exports.login = function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.render('login', { errorMessage: info.message });

    req.login(user, () => {
      res.redirect(req.session.returnTo || '/');
      delete req.session.returnTo;
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
