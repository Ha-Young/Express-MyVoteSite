exports.authorization = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.locals.isAnonymousUser = true;
  }
  next();
};