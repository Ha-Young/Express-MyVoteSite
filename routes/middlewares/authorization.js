const { ROUTES, ROUTE_AUTH, CALLBACK_URI } = require('../../config/constants');

exports.verifyUser = function verifyUser(req, res, next) {
  const { params, session } = req;

  if (session && !session.user) {
    if (params && params.id) res.cookie(CALLBACK_URI, `${ROUTES.VOTINGS}/${params.id}`);
    return res.redirect(ROUTES.AUTH + ROUTE_AUTH.LOGIN);
  }
  next();
};
