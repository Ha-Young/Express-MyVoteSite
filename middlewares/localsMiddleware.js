exports.localsMiddleware = (req, res, next) => {
  res.locals.user = req.user;
  next();
};
