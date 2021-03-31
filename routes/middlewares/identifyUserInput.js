const createError = require("http-errors");
const User = require("../../models/User");

const identifyUserInput = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (email === "" || password === "" || confirmPassword === "") {
    return next(createError(400, "Please enter your information"));
  }

  if (password !== confirmPassword) {
    return next(createError(400, "The passwords are not the same"));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    next(createError(400, "User already exists"));
  }

  next();
};

exports.identifyUserInput = identifyUserInput;
