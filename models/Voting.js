const mongoose = require('mongoose');

const VotingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Voting', VotingSchema);
