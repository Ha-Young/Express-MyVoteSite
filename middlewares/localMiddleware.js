exports.localMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Votings";

  next();
};
