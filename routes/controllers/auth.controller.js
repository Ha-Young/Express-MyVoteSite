const bcrypt = require("bcrypt");
const User = require("../../models/User");

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
      res.render("signup", { message: "이미 존재하는 이메일 입니다" });
      return;
    }

    await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    req.flash("message", "회원가입을 축하합니다");
    res.status(301).redirect("/votings/success");
  } catch (err) {
    next(err);
  }
};
