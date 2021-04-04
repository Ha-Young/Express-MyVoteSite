const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { SALT_ROUND } = require("../utils/constants");

exports.getSignUpPage = function(req, res, next) {
  res.render(
    "signUp",
    { title: "Sign up",
      signUpMessages: req.flash("signUpMessage")
    }
  );
}

exports.registerNewUser = async function(req, res, next) {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND.SALT_ROUND);

    await User.create({
      email,
      userName: username,
      password: hashedPassword,
    }, (error) => {
      if (error) {
        next(error);
      }
    });

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};
