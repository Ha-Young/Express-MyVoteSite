module.exports = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.session.unreached = req.originalUrl;
    res.redirect('/users/login');
  }
};
