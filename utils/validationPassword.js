const AUTH = require("../constants/authConstants");

/**
 * This function check the password of suer input value
 * The rule must enter a value of at least 8 digits including
 * letter and numbers
 *
 * @param {String} password The String of user input the password
 * @param {String} secondPassword The String of user input the checking password
 * @returns {String} return value is the result fo validationpassword
 */

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
