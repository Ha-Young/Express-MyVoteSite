const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('You have to login.');
  }
};

module.exports = isLoggedIn;
