const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  voteTitle: String,
  expiryDate: String,
  voteOptions1: String,
  voteOptions2: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('vote', VoteSchema);
