const createError = require("http-errors");
const mongoose = require("mongoose");

const ERROR_MESSAGE = require("../constants/errorConstants");

function handleError(errorStatus, error) {
  if (error instanceof mongoose.CastError) {
    console.error(error.message);
  }

  switch (errorStatus) {
    case 404:
      return createError(404, ERROR_MESSAGE.NOT_FOUND);

    default:
      return createError(500, ERROR_MESSAGE.SERVER_ERROR);
  }
}

module.exports = handleError;
