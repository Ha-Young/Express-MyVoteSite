const ROUTES = require('../constants/routes');

module.exports = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.routes = ROUTES;
  next();
};
