function setUserNickname(app) {
  return app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user;
      next();

      return;
    }

    res.locals.user = {
      _id: "@#ef22nkf!@sd#f2d@4m1f3g#wc#s2&3kn#d3#!emd"
    };
    next();
  });
}

module.exports = setUserNickname;
