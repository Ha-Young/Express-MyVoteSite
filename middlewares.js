export const localMiddleware = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

export const onlyPrivacy = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};
