const passport = require('passport');

exports.processLogin = (req, res, next) => {
  passport.authenticate('local', (err, validUser, authFailureMessage) => {
    if (err) {
      return next(new errors.GeneralError(err.message));
    }

    if (!validUser) {
      return next(new errors.InvalidLoginInputError(authFailureMessage));
    }

    req.logIn(validUser, err => {
      if (err) {
        return next(new errors.LoginError(err.message));
      }

      return res.redirect('/');
    });
  })(req, res, next);
};
