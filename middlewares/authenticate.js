const checkAuth = (req, res, next) => {
  const continueURL = req.originalUrl;
  if (req.isAuthenticated()) return next();

  return res.status(302).redirect(`/login?continue=${continueURL}`);
};

module.exports = checkAuth;
