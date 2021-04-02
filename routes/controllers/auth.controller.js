const bcrypt = require("bcrypt");
const User = require("../../models/User");

const resultMessage = require("../../constants/resultMessage");

exports.renderLogin = function (req, res, next) {
  try {
    const flashMessage = req.flash();
    if (flashMessage.error) {
      res.status(200).render("login", { errorMessage: flashMessage.error[0] });
    } else {
      res.status(200).render("login");
    }
  } catch (err) {
    next(err);
  }
};

exports.logout = function (req, res, next) {
  try {
    req.logout();
    res.status(301).redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.renderSignup = function (req, res, next) {
  res.status(200).render("signup");
};

exports.postSignup = async function (req, res, next) {
  try {
    const { name, email, password: plainPassword } = req.body;
    const encryptedPassword = await bcrypt.hash(plainPassword, 10);
    const user = await User.findOne({ email });

    if (user) {
      res.render("signup", { message: resultMessage.INVALID_EMAIL });
      return;
    }

    await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    req.flash("message", resultMessage.SUCCESS_SIGNUP);
    res.status(302).redirect("/votings/success");
  } catch (err) {
    next(err);
  }
};
