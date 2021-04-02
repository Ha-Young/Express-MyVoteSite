const AUTH = require("../constants/authConstants");

function validationEmail(userEmail) {
  const emailRegex = new RegExp("([\\w-\\.]+)@((?:[\\w]+\\.)+)([a-zA-Z]{2,4})");

  if (!emailRegex.test(userEmail)) {
    return AUTH.EMAIL_FORMAT;
  }
}

module.exports = validationEmail;
