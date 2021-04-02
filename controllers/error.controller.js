const createError = require('http-errors');

exports.renderErrorPage = async function (req, res, next) {
  const status = parseInt(req.params.status) ?? 500;

  next(createError(status));
};
