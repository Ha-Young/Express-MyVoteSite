function checkAuthenticated(req, res, next) {
  const { headers: { referer } } = req;

  if (req.isAuthenticated()) {
    res.locals.user = req.user;
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

function addUserInfo(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  return next();
}

exports.checkAuthenticated = checkAuthenticated;
exports.checkNotAuthenticated = checkNotAuthenticated;
exports.addUserInfo = addUserInfo;
