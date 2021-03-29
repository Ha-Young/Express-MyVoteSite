const User = require("../models/User");
const createError = require("http-errors");

exports.signup = (req, res) => {

  res.render("signup");
};

exports.createUser = async (req, res, next) => {
  try {
    await User.create(req.body);

    res.status(301).redirect("/login");
  } catch {
    next(createError(400, "invalid password or email"));
  }
};
