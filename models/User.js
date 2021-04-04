const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /\w*@\w*.\w*/,
  },
  password: {
    type: String,
    required: true,
  },
  myVotings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voting',
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
