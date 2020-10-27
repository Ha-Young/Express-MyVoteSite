const saveSession = async (req, res, next) => {
  req.session.user = res.locals.user;
  req.session.save();

  next();
};

module.exports = saveSession;
