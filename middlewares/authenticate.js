module.exports = checkAuth = (req, res, next) => {
  const continueURL = req.originalUrl;
  if (req.isAuthenticated()) return next();

  res.status(301).redirect(`/login?continue=${continueURL}`);
};
