const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const config = require('../config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  nickname: {
    type: String,
    unique: true,
    required: [true, 'Please tell us your nickname!'],
    maxlength: 15,
    minlength: 2,
  },
  password: {
    type: String,
    maxlength: 20,
    minlength: 8,
    select: false,
  },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.isSocial = function () {
  return !this.password;
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  try {
    this.password = await bcrypt.hash(this.password, config.salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
