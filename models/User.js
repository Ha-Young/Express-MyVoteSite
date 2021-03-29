const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  votingIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voting',
    unique: true,
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
