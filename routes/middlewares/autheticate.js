const autheticate = (req, res, next) => {
  res.locals.user = req.user || null;
  console.log(req.user);
  next();
};
