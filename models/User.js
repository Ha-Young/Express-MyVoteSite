const mongoose = require('mongoose');
const validator = require('validator');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const config = require('../config');

const UserSchema = new mongoose.Schema({
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
    required: [true, 'Please provide a password'],
    maxlength: 20,
    minlength: 8,
    select: false,
  },
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  try {
    this.password = await bcrypt.hash(this.password, config.salt);
    next();
  } catch (err) {
    next(createError(500));
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
