const passport = require('passport');

const errors = require('../lib/errors');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, validUser, authFailureMessage) => {
    if (err) {
      return next(new errors.GeneralError(err.message));
    }

    if (!validUser) {
      req.flash('Login Error Message', authFailureMessage);
      return res.redirect('/auth/login');
    }

    req.logIn(validUser, err => {
      if (err) {
        return next(new errors.LoginError(err.message));
      }

      // setTimeout(() => {
      //   res.redirect(req.session.returnTo || '/');
      // }, 0);
      res.redirect(req.session.returnTo || '/');
      delete req.session.returnTo;
    });
  })(req, res, next);
};

exports.logout = async (req, res, next) => {
  await req.logout();
  await req.session.destroy();
  await res.clearCookie('connect.sid');

  res.redirect('/');
};
