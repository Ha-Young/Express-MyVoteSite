const mongoose = require('mongoose');
const { vaildEmail, vaildPassword } = require('../constants/reg-exp');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: vaildEmail,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    match: vaildPassword,
    trim: true,
    required: true
  }
});

userSchema.pre('save', async function(next) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
