const createError = require('http-errors');

exports.renderErrorPage = function (req, res, next) {
  const status = parseInt(req.params.status) ?? 500;

  next(createError(status));
};
