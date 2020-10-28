const mongoose = require('mongoose');

// FIXME: 각 유저에게 _id 옵션을 주는게 좋을까? --> 자동생성..
// 각 유저 이메일 유니크..??
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  voteCollection: [{
    type: mongoose.Types.ObjectId,
    ref: 'Votes',
  }],
});

module.exports = new mongoose.model('User', UserSchema);
