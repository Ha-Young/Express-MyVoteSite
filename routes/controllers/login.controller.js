const passport = require('passport');

exports.AuthenticatePassport = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) next(error);
    if (!user) {
      return res.redirect('/login');
    }

    req.login(user, (error) => {
      if (error) return next(error);
      if (req.session.returnTo) {
        const redirectUrl = req.session.returnTo;
        delete req.session.returnTo;
        return res.redirect(redirectUrl);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.renderLogin = (req, res, next) => {
  res.render('login');
};
