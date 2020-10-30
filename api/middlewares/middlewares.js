exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const { callbackUrl } = req.body;

    if (callbackUrl) return res.json({ callbackUrl: `/login?callbackUrl=${callbackUrl}` });
    return res.redirect('/login');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.redirect('/');
};

exports.setLocals = (req, res, next) => {
  if (req.user) res.locals.login = true;

  return next();
};