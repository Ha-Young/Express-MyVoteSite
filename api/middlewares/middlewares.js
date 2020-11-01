const passport = require('passport');

const {
  ROUTES_GLOBAL,
  ROUTES_USER
} = require('../../config/constants');

exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) return next(authError);
    if (!user) {
      const error = new Error(info.loginResult);
      error.status = 400;

      return next(error);
    }

    return req.login(user, (loginError) => {
      if (loginError) return next(loginError);

      return next();
    });
  })(req, res, next);
};
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  const { callbackUrl } = req.body;

  if (callbackUrl) return res.json({ callbackUrl: `${ROUTES_USER.LOGIN}?callbackUrl=${callbackUrl}` });
  return res.redirect(ROUTES_USER.LOGIN);
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.redirect(ROUTES_GLOBAL);
};
exports.setLocals = (req, res, next) => {
  if (req.user) res.locals.login = true;

  return next();
};
