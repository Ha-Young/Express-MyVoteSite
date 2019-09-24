const mongoose = require('mongoose');

const VotingSchema = new mongoose.Schema({
  creator_id: String,
  title: String,
  description: String,
  options: [
    {
      option: String,
      votes: Number,
      voters: Array
	  }
	],
  expireDate: { type: Date, default: Date.now }
});

const Voting = mongoose.model('Voting', VotingSchema);
module.exports = Voting;
