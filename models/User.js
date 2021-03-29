const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "No Name User",
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unipue: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "A user must have a password"],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password is not the same",
    },
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT));
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  const isCorrect = await bcrypt.compare(candidatePassword, userPassword);

  return isCorrect;
};

module.exports = mongoose.model("User", UserSchema);
