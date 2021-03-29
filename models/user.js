const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  root: {
    type: String,
    default: 'local',
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }],
});

module.exports = mongoose.model('User', userSchema);
