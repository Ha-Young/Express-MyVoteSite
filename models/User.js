const mongoose = require('mongoose');

// FIXME: 각 유저에게 _id 옵션을 주는게 좋을까? --> 자동생성..
// 각 유저 이메일은 유니크함.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Votes',
    unique: true,
  }],
});

module.exports = new mongoose.model('User', userSchema);
