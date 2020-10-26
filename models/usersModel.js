const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirm: String
});

userSchema.pre('save', async function (next) {
  console.log(this.isModified('password'), 'isM')
  const encrypted = await bcrypt.hash(this.password, Number(process.env.SALT));

  this.password = encrypted
  this.passwordConfirm = undefined
  next();
});

userSchema.methods.verifyPassword = async (plainPassword, encrypted) => {
  return await bcrypt.compare(plainPassword, encrypted);
}

const User = mongoose.model('User', userSchema);

module.exports = User;