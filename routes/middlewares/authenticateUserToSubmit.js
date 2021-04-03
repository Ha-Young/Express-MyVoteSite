function authenticateUserToSubmit(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(301).json({ url: `/auth/login?url=${ req.originalUrl }` });
}

module.exports = authenticateUserToSubmit;
