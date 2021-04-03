function setUserNickname(req, res, next) {
  try {
    if (req.user) {
      res.locals.user = req.user;
      next();

      return;
    }

    res.locals.user = {
      _id: process.env.DOMMY_ID
    };
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = setUserNickname;
