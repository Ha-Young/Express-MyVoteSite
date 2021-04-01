const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");
const User = require("../../models/User");
dotenv.config();

exports.createUser = async function (req, res, next) {
  try {
    const isUser = await User.findOne({ email: req.user.email });

    if (isUser) {
      // 이메일이 있으면 에러를 던지는게 아니라 바로 줘야됨

      req.user = isUser;
      return next();
      // next(createError(400, errorMessage.EMAIL_EXIST));
    }

    const user = new User({
      name: req.user.name,
      email: req.user.email,
    });

    try {
      await user.save();
      const signedUser = await User.findOne({ email: req.user.email });
      req.user = signedUser;
      next();
    } catch (error) {
      console.log(error.message);
      const createdErr = createError(500, errorMessage.SERVER_ERROR);
      next(createdErr);
    }
  } catch (error) {
    const createdErr = createError(500, errorMessage.SERVER_ERROR);
    next(createdErr);
  }
};
