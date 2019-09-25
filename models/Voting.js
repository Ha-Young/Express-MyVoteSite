const mongoose = require('mongoose');

const VotingSchema = new mongoose.Schema({
  creator_id: {
    type: String,
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
      voters: Array
	  }
	],
  expireDate: {
    type: Date, 
    default: Date.now
  }
});

const Voting = mongoose.model('Voting', VotingSchema);
module.exports = Voting;
