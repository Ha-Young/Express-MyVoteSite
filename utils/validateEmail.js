/**
 * Used to check email is valid with regex
 * @param {string} email - email address from form
 * @return {boolean} return boolean value to determin it is valid or not
 */
const validateEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(email);
}

module.exports = validateEmail;
