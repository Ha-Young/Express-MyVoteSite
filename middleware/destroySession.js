const saveSession = async (req, res, next) => {
  req.session.destroy();

  next();
};

module.exports = saveSession;
