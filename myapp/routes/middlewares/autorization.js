module.exports= function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();

  if (req.body.targetOptionId && !req.isAuthenticated()) {
    req.session.lastUrl = req.body.lastPageURL;
    return res.status(401).end();
  }

  return res.redirect(302, '/login');
}
