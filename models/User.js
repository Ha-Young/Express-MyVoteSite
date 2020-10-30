const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  myVotingList: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Vote',
    },
  ],
});

module.exports = new mongoose.model('User', userSchema);
