const createError = require('http-errors');

const requiresLogin = (req, res, next) => {
  const { user, session, method } = req;

  if (user) {
    return next();
  }

  if (method === 'GET') {
    return next(createError(401, 'You must be logged in to view this page.'));
  }

  session.referer = req.originalUrl;
  return res.status(401).json({ message: 'unauthrized' });
};

module.exports = requiresLogin;
