const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    default: 'local'
  }
});

module.exports = mongoose.model('User', userSchema);
