export default (req, res, next) => {
  res.locals.user = req.user;
  next();
};
