const User = require("../../models/User");
const createError = require("http-errors");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await new User({
      email,
      password,
    }).save();

    res.redirect("/login");
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};
