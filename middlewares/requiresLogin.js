const rotues = require('../constants/routes');
const { RESPONSE } = require('../constants/index');

exports.requiresLogin = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  req.session.redirectUrl = req.originalUrl;

  const isFetch = req.headers.accept.indexOf('json') !== -1;

  if (isFetch) {
    res.json({ result: RESPONSE.REQUIRED_LOGIN });
    return;
  }

  res.redirect(rotues.login);
};
