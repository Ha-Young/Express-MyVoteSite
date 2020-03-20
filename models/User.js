const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePasswordSync = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
