const statuses = require('statuses');

exports.renderErrorPage = function (req, res, next) {
  const status = parseInt(req.params.status) ?? 500;

  res.render('error', { message: statuses[status], error: { status } })
};
