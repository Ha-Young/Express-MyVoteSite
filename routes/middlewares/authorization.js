exports.verifyUser = function verifyUser(req, res, next) {
  const { params, session } = req;

  if (session && !session.user) {
    if (params && params.id) res.cookie('callback', `/votings/${params.id}`);
    return res.redirect('/auth/login');
  }

  next();
};
