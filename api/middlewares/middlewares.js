const passport = require('passport');
const {
  ROUTES_GLOBAL,
  ROUTES_USER
} = require('../../config/constants');

exports.getAuthenticated = passport.authenticate('local', { failureRedirect: ROUTES_USER.LOGIN });
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
