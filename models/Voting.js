const mongoose = require('mongoose');

const VotingSchema = new mongoose.Schema({
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  options: [
    {
      option: String,
      voters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
	  }
	],
  expireDate: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Voting = mongoose.model('Voting', VotingSchema);
module.exports = Voting;
