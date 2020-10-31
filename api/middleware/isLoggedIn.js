module.exports = (req, res, next) => {
  try {
    if (req.session.logined) return next();
    throw new Error('Please login first');
  } catch (err) {
    res.render('auth/pleaseLogin');
  }
};
