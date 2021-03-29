const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "A user must have an email"]
  },
  password: {
    type: String,
    required: [true, "A user must have a password"]
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have confirm password"],
    validate: {
      validator: function (confirmPassword) {
        return confirmPassword === this.password;
      }
    }
  }
});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  this.password = await bycrypt.hash(this.password, 12);

  this.passwordConfirm = null;
  next();
});

module.exports = mongoose.model("User", userSchema);
