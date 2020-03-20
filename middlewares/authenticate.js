module.exports = checkAuth = (req, res, next) => {
  const continueURL = req.originalUrl;
  if (req.user) return next();

  res.status(301).redirect(`/login?continue=${continueURL}`);
};
