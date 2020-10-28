const createError = require('http-errors');

const requiresLogin = (req, res, next) => {
  const { user } = req;
  console.log('req.session:', req.session);

  if (!user) {
    return next(createError(401, 'You must be logged in to view this page.'));
  }

  next();
};

module.exports = requiresLogin;
