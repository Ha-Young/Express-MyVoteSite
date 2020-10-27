const saveHistory = (req, res, next) => {
  req.session.beforeUrl = req.session.tempUrl;
  req.session.tempUrl = req.session.currentUrl;
  req.session.currentUrl = req.originalUrl;

  next();
};

module.exports = saveHistory;
