const createError = require("http-errors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  PASSWORD_HASHING_FAILED_ERROR,
  HASHED_PASSWORD_COMPARISON_FAILED_ERROR
} = require("../constants/errorMessage");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

UserSchema.pre(
  "save",
  function (next) {
    const user = this;

    if (!user.isModified("password")) {
      return next();
    }

    bcrypt.genSalt(saltRounds)
      .then((salt) => bcrypt.hash(user.password, saltRounds))
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((err) =>
        next(createError(500, PASSWORD_HASHING_FAILED_ERROR))
      );
  }
);

UserSchema.methods.comparePassword = (inputPassword, passwordHash) => {
  const comparisonResult = bcrypt
    .compare(inputPassword, passwordHash)
    .then((result) => {
      return result;
    })
    .catch((err) =>
      next(createError(500, HASHED_PASSWORD_COMPARISON_FAILED_ERROR))
    );

  return comparisonResult;
}

module.exports = mongoose.model("user", UserSchema);
