function setUserNickname(app) {
  return app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user;
      next();

      return;
    }

    res.locals.user = {
      _id: "@#ef22nkf!@#@mfknd3#!emd"
    };
    next();
  });
}

module.exports = setUserNickname;
