const User = require("../../model/User");
const cryptograph = require("../../utils/cryptograph");
const createError = require("http-errors");

exports.getSignup = (req, res, next) => res.render("signup");
exports.addUser = async (req, res, next) => {
  const {
    email,
    userName,
    password,
  } = req.body;

  try {
    const { cryptoPassword, salt } = await cryptograph(password);
    const newUserDoc = new User({
      email,
      password: cryptoPassword,
      _salt: salt,
      user_name: userName,
    });
    newUserDoc.save();
    return res.send(302, "/login");
  } catch (error) {
    console.error(error);
    return next(createError(500));
  }
};
