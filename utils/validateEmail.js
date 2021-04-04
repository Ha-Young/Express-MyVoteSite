const AUTH = require("../constants/authConstants");

/**
 * This function check ths email of user input value
 * The rule must have an @ and must be of the form .com for example
 *
 * @param {String} userEmail The String of user input the email
 * @returns {String} Returns the validation result as a String
 */

function validateEmail(userEmail) {
  const emailRegex = new RegExp("([\\w-\\.]+)@((?:[\\w]+\\.)+)([a-zA-Z]{2,4})");

  if (!emailRegex.test(userEmail)) {
    return { result: false, message: AUTH.EMAIL_FORMAT }
  }

  return { result: true, message: null };
}

module.exports = validateEmail;
