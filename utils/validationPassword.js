const AUTH = require("../constants/authConstants");

function validationPassword(password, secondPassword) {
  const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-zA-z]).{8,15}$");

  if (!passwordRegex.test(password)) {
    return AUTH.WORNG_PASSWORD_MESSAGE;
  }

  if (password.length !== secondPassword.length) {
    return AUTH.DIFFERENT_PASSWORD;
  }
}

module.exports = validationPassword;
