module.exports = checkAuth = (req, res, next) => {
  if (req.user) {
    return next();
  }

  res.status(301).redirect('/login');
};
