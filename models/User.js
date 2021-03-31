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
  async function (next) {
    await bcrypt
      .hash(this.password, saltRounds)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) =>
        next(createError(500, "Password hashing failed"))
      );
  }
);

module.exports = mongoose.model("user", UserSchema);
