const User = require("../../models/User");
const createError = require("http-errors");
const { generateAccessToken } = require("../middlewares/generateAccessToken");
const { INTERNAL_SERVER_ERROR } = require("../../constants/errorMessage");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await new User({
      email,
      password,
    }).save();

    return res.redirect("/login");
  } catch (err) {
    return next(createError(500, INTERNAL_SERVER_ERROR));
  }
};

exports.generateToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const token = generateAccessToken(payload);

    res.cookie("user", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.redirect("/");
  } catch (err) {
    return next(createError(500, INTERNAL_SERVER_ERROR));
  }
};
