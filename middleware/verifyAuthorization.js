const verifyAuthorization = (req, res, next) => {
  if (!req.session.user) {
    req.session.previousUrl = req.originalUrl;
    req.session.save(() => {
      res.redirect('/login');
    });
  } else {
    next();
  }
};

module.exports = verifyAuthorization;
