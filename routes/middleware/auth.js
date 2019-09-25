module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    const err = new Error('Not Authenticated');
    err.status = 401;
    next(err);
  }
};
