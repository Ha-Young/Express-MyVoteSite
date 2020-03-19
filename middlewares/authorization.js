function authorization(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  }
}

exports.authorization = authorization;
