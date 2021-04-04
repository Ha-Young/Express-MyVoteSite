function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    next();
    return;
  }

  const { headers: { referer } } = req;

  req.session.referrer = referer;
  res.redirect('/auth/login');
}

function checkLoggedOut(req, res, next) {
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

exports.checkLoggedIn = checkLoggedIn;
exports.checkLoggedOut = checkLoggedOut;
exports.addUserInfo = addUserInfo;
