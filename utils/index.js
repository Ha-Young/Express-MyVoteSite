const jwt = require('jsonwebtoken');
const {
  signupErrorMessage,
  loginErrorMessage,
  createVotingErrorMessage
} = require('../constants/joiErrorMessage');
const { mongodbErrorMessage } = require('../constants/mongodbErrorMessage');

exports.getDecodedToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(301).redirect('/login');
    }

    return decoded.id;
  });
};

exports.getErrorType = function (err) {
  switch (err.message) {
    case signupErrorMessage.INVALID_EMAIL:
      return { email: {
        message: err.message
      }};
    case signupErrorMessage.INVALID_NAME:
        return { name: {
          message: err.message
        }};
    case signupErrorMessage.INVALID_PASSWORD:
      return { password: {
        message: err.message
      }};
    case signupErrorMessage.INVALID_PASSWORDCONFIRM:
      return { passwordConfirm: {
        message: err.message
      }};
    case loginErrorMessage.INVALID_EMAIL:
      return { email: {
        message: err.message
      }};
    case loginErrorMessage.INVALID_PASSWORD:
      return { password: {
        message: err.message
      }};
    case createVotingErrorMessage.INVALID_TITLE:
      return { title: {
        message: err.message
      }};
    case createVotingErrorMessage.INVALID_OPTION:
      return { option: {
        message: err.message
      }};
    case createVotingErrorMessage.INVALID_EXPIRATION_DATE:
      return { expiration_date: {
        message: err.message
      }};
    case mongodbErrorMessage.EMAIL_ALREADY_EXIST:
      return { email: {
        message: err.message
      }};
    case mongodbErrorMessage.EMAIL_DOESNT_EXIST:
      return { email: {
        message: err.message
      }};
    case mongodbErrorMessage.WRONG_PASSWORD:
      return { password: {
        message: err.message
      }};
  }
}
