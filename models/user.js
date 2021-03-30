const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
  },
  localEmail: {
    type: String,
    minlength: 2,
    maxlength: 16,
  },
  password: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
  },
  root: {
    type: String,
    default: 'local',
  },
});

module.exports = mongoose.model('User', userSchema);
