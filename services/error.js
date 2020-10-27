const {
  VALIDATION,
  VALIDATION_ERROR_MESSAGE,
} = require('./constants');

class ValidationError extends Error {
  constructor(message = VALIDATION_ERROR_MESSAGE, code = 422) {
    super();
    this.type = VALIDATION;
    this.message = message;
    this.status = code;
  }
}

module.exports = {
  ValidationError,
};
