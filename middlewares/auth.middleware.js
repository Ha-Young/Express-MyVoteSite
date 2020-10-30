const authenticateUser = async (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();
  if (isLoggedIn) {
    res.set(
      'Cache-Control',
      'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0'
    );

    return next();
  }
  req.session.redirectUrl = req.originalUrl;
  res.redirect('/login');
};

const private = (req, res, next) => {
  req.user ? next() : res.redirect('/login');
};

module.exports = {
  authenticateUser,
  private,
};
