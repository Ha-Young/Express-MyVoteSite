exports.localMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Votings";

  if(req.user) {
    res.locals.currentUser = {
      name: req.user.username,
      id: req.user.id,
    };
  }

  next();
};
