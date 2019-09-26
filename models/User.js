const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  provider: {
    type: String,
    default: 'local'
  }
});

module.exports = mongoose.model('User', userSchema);
