const mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true, index: { unique: true } },
  password: { type: String, unique: true, require: true }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', userSchema);
