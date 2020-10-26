const {
  DATABASE,
  DATABASE_ERROR_MESSAGE,
} = require('./constants');

class CreateError extends Error {
  constructor(type, message) {
    super(message);

    if (type.toUpperCase() === DATABASE) {
      this.type = DATABASE;
      this.message = DATABASE_ERROR_MESSAGE;
      this.status = 500;
    }
  }
}

module.exports = (type) => {
  return new CreateError(type);
};
