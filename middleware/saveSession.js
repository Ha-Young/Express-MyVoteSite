const saveSession = async (req, res, next) => {
  req.session.user = res.locals.user;

  next();
};

module.exports = saveSession;
