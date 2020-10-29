exports.authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  if (req.method === 'PUT') {
    return res.status(401).json({ result: 'Unauthorized user' });
  }
  return res.redirect('/login');
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};
