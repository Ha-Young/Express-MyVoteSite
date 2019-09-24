const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  nickname: {
    type: String
  },
  password: {
    type: String
  },
  provider: {
    type: String,
    default: 'local'
  },
  username: {
    type: String
  },
  githubId: {
    type: Number
  }
});

module.exports = mongoose.model('User', userSchema);
