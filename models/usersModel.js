const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const ALPHABET = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: true,
    min: 5,
    validate: {
      validator: function () {
        const regex = new RegExp(/^[a-zA-Z0-9]{5,8}$/);
        return regex.test(this);
      },
    },
  },
  passwordConfirm: String,
  createdVoting: Array,
});

userSchema.pre('save', async function (next) {
  console.log(this.isModified('password'), 'isM');
  const encrypted = await bcrypt.hash(this.password, Number(process.env.SALT));

  this.password = encrypted;
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.verifyPassword = async (plainPassword, encrypted) => {
  return await bcrypt.compare(plainPassword, encrypted);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
