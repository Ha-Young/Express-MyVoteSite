const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { EMAIL_RULE, NAME_RULE, SALT_ROUNDS } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: EMAIL_RULE,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 12
  },
  name: {
    type: String,
    required: true,
    trim: true,
    match: NAME_RULE
  }
});

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
