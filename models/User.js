const mongoose = require('mongoose');
/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  provider: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
