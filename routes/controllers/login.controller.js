const passport = require('passport');

exports.renderLogin = (req, res, next) => {
  res.render('login');
};

exports.authenticateUser = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    let redirectUrl = '/';

    if (!user) { return res.redirect('/login'); }
    if (req.session.redirectUrl) {
      redirectUrl = req.session.redirectUrl;
      delete req.session.redirectUrl;
    }

    req.logIn(user, function (err) {
      if (err) { return next(err); }
    });

    return res.redirect(redirectUrl);
  })(req, res, next);
};
