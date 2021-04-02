function authenticateUserToSubmit(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.json({ url: `/auth/login?url=${ req.originalUrl }` });
}

module.exports = authenticateUserToSubmit;
