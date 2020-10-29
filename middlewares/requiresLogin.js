const rotues = require('../constants/routes');

exports.requiresLogin = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  req.session.redirectUrl = req.originalUrl;

  const isFetch = req.headers.accept.indexOf('json') !== -1;

  if (isFetch) {
    res.json({ result: 'required login' });
    return;
  }

  res.redirect(rotues.login);
};
