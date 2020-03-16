const setLocals = (req, res, next) => {
  res.locals.loggedUser = req.user
  next();
};

module.exports = setLocals;
