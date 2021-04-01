const createError = require("http-errors");
const User = require("../../models/User");
const { INTERNAL_SERVER_ERROR } = require("../../constants/errorMessage");

const verifyLoginInput = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const savedUser = await User.findOne({ email });
    const isValidPassword = await savedUser.validatePassword(password, savedUser.password);

    if (email === "" || password === "") {
      return res.redirect("/login");
    }

    if (!savedUser) {
      return res.redirect("/login");
    }

    if (!isValidPassword) {
      return res.redirect("/login");
    }

    next();
  } catch (err) {
    return next(createError(500, INTERNAL_SERVER_ERROR));
  }
};

exports.verifyLoginInput = verifyLoginInput;
