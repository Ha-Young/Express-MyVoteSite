const createError = require("http-errors");

const validateUserData = require("../utils/validateUserData");
const User = require("../models/User");

module.exports.get = async (req, res, next) => {
  res.status(200).render("signup");
};

module.exports.post = async (req, res, next) => {
  const user = req.body;
  const validationResult = await validateUserData(user);

  if (validationResult.result) {
    try {
      const newUser = new User({
        name: user.name,
        password: user.password,
        email: user.email,
      });

      await newUser.save();
    } catch (err) {
      next(createError(500, err.message));
      return;
    }
    res.status(201).json(validationResult);
  } else {
    res.status(422).json(validationResult);
  }
};
