export const localMiddleware = (req, res, next) => {
  res.locals.user = req.user;
  next();
};