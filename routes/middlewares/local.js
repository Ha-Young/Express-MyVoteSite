exports.localMiddleware = (req, res, next) => {
  res.locals.isLoggedIn = !!req.user;
  next();
};
