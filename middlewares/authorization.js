exports.authorization = async (req, res, next) => {
  if (!req.user) {
    res.locals.isAnonymousUser = true;
  }
  next();
};
