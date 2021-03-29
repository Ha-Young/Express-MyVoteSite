const validateUserData = require("../utils/validateUserData");

module.exports.get = async (req, res, next) => {
  res.status(200).render("signup");
};

module.exports.post = async (req, res, next) => {
  const user = req.body;
  console.log(user);

  const validationResult = await validateUserData(user);
  console.log(validationResult);

  res.status(201).json(validationResult);
};
