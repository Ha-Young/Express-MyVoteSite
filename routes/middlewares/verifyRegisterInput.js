const createError = require("http-errors");
const User = require("../../models/User");
const {
  INTERNAL_SERVER_ERROR,
  UNFILLED_INFORMATION_ERROR,
  MISMATCHED_CONFIRM_PASSWORD_ERROR,
  ALREADY_SIGNED_UP_USER_ERROR
} = require("../../constants/errorMessage");

const verifyRegisterInput = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const userExists = await User.findOne({ email });

    if (email === "" || password === "" || confirmPassword === "") {
      return next(createError(400, UNFILLED_INFORMATION_ERROR));
    }

    if (password !== confirmPassword) {
      return next(createError(400, MISMATCHED_CONFIRM_PASSWORD_ERROR));
    }

    if (userExists) {
      return next(createError(400, ALREADY_SIGNED_UP_USER_ERROR));
    }

    next();
  } catch (err) {
    return next(createError(500, INTERNAL_SERVER_ERROR));
  }
};

exports.verifyRegisterInput = verifyRegisterInput;
