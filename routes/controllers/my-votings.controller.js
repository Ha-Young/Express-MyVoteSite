exports.asdf = (req, res, next) => {
  res.render('myvoting', { hasLoggedIn: true });
};