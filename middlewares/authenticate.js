module.exports = checkAuth = (req, res, next) => {
  // const referer = req.header("referer");
  const continueURL = req.originalUrl;
  if (req.user) {
    return next();
  }

  res.status(301).redirect(`/login?continue=${continueURL}`);
  // res.status(301).redirect(`/login?continue=green`);
};
