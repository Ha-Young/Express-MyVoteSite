const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "No Name User",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have a email"],
    validate: {
      validator: function (el) {
        return el.match(/^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/);
      },
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, "A user must have a password"],
    minLength: 8,
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
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", UserSchema);
