exports.validator = (req, res, next) => {
  const { password, passwordConfirmation } = req.body;

  if (password === passwordConfirmation) next();
};
