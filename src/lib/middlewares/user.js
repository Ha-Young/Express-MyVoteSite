import createError from 'http-errors';

export const checkLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) return next();

  try {
    req.session.redirectUrl = req.headers.referer;
    await req.session.save();

    res.redirect(302, '/users/login');
  } catch (e) {
    next(createError(500));
  }
};

export const getLocalsLoggedUser = (req, res, next) => {
  res.locals.loggedUser = req.user || null;
  next();
};
