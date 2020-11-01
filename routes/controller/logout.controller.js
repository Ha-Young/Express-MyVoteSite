const logout = (req, res, next) => {
  try {
    req.session.destroy();
    res.render('logout');
  } catch (err) {
    next(err);
  }
};

module.exports = logout;
