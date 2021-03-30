const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
