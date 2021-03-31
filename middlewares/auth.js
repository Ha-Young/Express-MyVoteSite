function checkAuthenticated(req, res, next) {
  const { headers: { referer } } = req;

  if (req.isAuthenticated()) {
    return next();
  }

  req.session.referrer = referer;
  res.redirect('/auth/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }

  next();
}

exports.checkAuthenticated = checkAuthenticated;
exports.checkNotAuthenticated = checkNotAuthenticated;
