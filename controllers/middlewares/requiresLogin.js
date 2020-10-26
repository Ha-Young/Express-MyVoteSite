const createError = require('http-errors');

const requiresLogin = (req, res, next) => {
  const { url, user } = req;

  if (!user) {
    if (url === '/') return res.redirect('/login');
    return next(createError(401, 'You must be logged in to view this page.'));
  }

  next();
};

module.exports = requiresLogin;
