function setUserNickname(app) {
  return app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user.nickname;
      next();

      return;
    }

    res.locals.user = null;
    next();
  });
}

module.exports = setUserNickname;
