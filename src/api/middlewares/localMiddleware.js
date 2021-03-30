exports.localMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Votings";

  if(req.user) {
    res.locals.currentUser = req.user.username;
  }

  next();
};
