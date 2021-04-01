const createError = require("http-errors");

const User = require("../../model/User");

const cryptograph = require("../../utils/cryptograph");

exports.getSignup = (req, res, next) => res.render("signup");

exports.addUser = async (req, res, next) => {
  if (await User.exists({ email: req.body.email })) {
    return res.json({ result: "invalid", message: "already existed" });
  }

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

    return res.json({ result: "success", message: "user has been created" });
  } catch (error) {
    console.error(error);
    return next(createError(500));
  }
};
