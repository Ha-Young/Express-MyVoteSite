exports.localMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Votings";
  res.locals.currentUser = {};

  if(req.user) {
    const { username, id } = req.user;

    res.locals.currentUser.name = username;
    res.locals.currentUser.id = id;
  }

  next();
};
