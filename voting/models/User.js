const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default:
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/225/monkey-face_1f435.png'
  }
});

module.exports = mongoose.model('User', userSchema);
