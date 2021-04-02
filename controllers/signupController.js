const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getSignUpPage = async function(req, res, next) {
  res.render(
    "signUp",
    { title: "Sign up",
      messages: req.flash("messages")
    }
  );
}

exports.registerNewUser = async function(req, res, next) {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      userName: username,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};
