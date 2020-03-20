exports.authorization = (req, res, next) => {
  // if (req.isAuthenticated()) {
  //   next();
  // } else {
  //   res.redirect('/');
  //   next()
  // }
  if (!req.user) {
    res.locals.isAnonymousUser = true;
  }
  next();
};