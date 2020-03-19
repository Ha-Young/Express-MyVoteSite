const passport = require('passport');

const errors = require('../lib/errors');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, validUser, authFailureMessage) => {
    if (err) {
      return next(new errors.GeneralError(err.message));
    }

    if (!validUser) {
      req.flash('errorMessage', authFailureMessage);
      res.redirect('/auth/login');
      // return next(new errors.InvalidLoginInputError(authFailureMessage));
    }

    req.logIn(validUser, err => {
      if (err) {
        return next(new errors.LoginError(err.message));
      }

      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = async (req, res, next) => {
  await req.logout();
  await req.session.destroy();
  await res.clearCookie('connect.sid');

  res.redirect('/');
};
