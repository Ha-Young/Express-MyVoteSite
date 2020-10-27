const passport = require('passport');

exports.AuthenticatePassport = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) next(error);
    if (!user) {
      return res.redirect('/login');
    }

    req.login(user, (error) => {
      if (error) return next(error);
      return res.redirect('/');
    });
  })(req, res, next);
};
