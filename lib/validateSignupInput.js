const createError = require('http-errors')

const regPatterns = {
  email: /^[a-z\d]+@[a-z]{4,8}\.[a-z]{2,5}$/,
  password: /^[a-z\d]{8,20}$/,
};

module.exports = async (req, res, next)=> {
  try {
    if (!regPatterns.email.test(req.body.email)) {
      throw(createError(422, "The email address is not acceptable"));
    }

    const password = req.body.password;
    if (!regPatterns.password.test(password)) {
      throw(createError(422, "The password is not acceptable"));
    }

    if (password !== req.body.confirmPassword) {
      throw(createError(422, "Please confirm your password"));
    }

    next();
  } catch(e) {
    next(e)
  }
};
