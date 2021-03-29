const createError = require("http-errors");

const validateUserData = require("../utils/validateUserData");
const User = require("../models/User");

module.exports.get = async (req, res, next) => {
  res.status(200).render("signup");
};

module.exports.post = async (req, res, next) => {
  const user = req.body;
  console.log(user);

  const validationResult = await validateUserData(user);
  console.log(validationResult);

  if (validationResult.result) {
    try {
      const newUser = new User({
        name: user.name,
        password: user.password,
        email: user.email,
      });

      await newUser.save();
    } catch (err) {
      console.log(err);
      next(createError(500, err.message));
      return;
    }
    res.status(201).json(validationResult);
  } else {
    res.status(400).json(validationResult);
  }
};
