const createError = require("http-errors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  async (next) => {
    await bcrypt
      .hash(this.password, saltRounds)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) =>
        next(createError(500, PASSWORD_HASHING_FAILED_ERROR))
      );
  }
);

UserSchema.methods.validatePassword = async (inputPassword, passwordHash) => {
  const comparisonResult = await bcrypt
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
