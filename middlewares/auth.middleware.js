const authenticateUser = (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();
  if (isLoggedIn) {
    // res.set(
    //   'Cache-Control',
    //   'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0'
    // );

    return next();
  } else {
    res.redirect('/login');
  }
};

module.exports = authenticateUser;
