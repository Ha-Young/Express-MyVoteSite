const createError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const errorMessage = require("../../constants/errorMessage");

exports.renderSignUpPage = function (req, res, next) {
  res.status(200).render("signUp", { messages: req.flash("signError") });
};

exports.createUser = async function (req, res, next) {
  console.log("validated body", req.body);
  try {
    const isUser = await User.findOne({ email: req.body.email });

    if (isUser) {
      const createdErr = createError(400, errorMessage.EMAIL_EXIST);
      next(createdErr);
    }

    const password = await encryptUserPassword(10, req.body.password);
    console.log(password);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });

    try {
      await user.save();
      return res.status(200).redirect("/");
    } catch (error) {
      const createdErr = createError(500, errorMessage.SERVER_ERROR);
      next(createdErr);
    }
  } catch (error) {
    const createdErr = createError(500, errorMessage.SERVER_ERROR);
    next(createdErr);
  }
};

async function encryptUserPassword(saltValue, userPassword) {
  try {
    const salt = await bcrypt.genSalt(saltValue);
    const encryptedPassword = await bcrypt.hash(userPassword, salt);

    return encryptedPassword;
  } catch (error) {
    return createError(500, errorMessage.SERVER_ERROR);
  }
}
