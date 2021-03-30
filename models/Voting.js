const mongoose = require('mongoose');

const VotingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiration_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['inprogress', 'finished'],
    default: 'inprogress',
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  votes: [{
    option: { type: String, required: true },
    count: { type: Number, default: 0, required: true }
  }]
});

VotingSchema.methods.addVoteCount = function(option) {
  const targetVote = this.votes.find(vote => vote.option === option);
  targetVote.count += 1;

  return this.save();
};

VotingSchema.statics.updateExpiredVotingStatus = function() {
  this.updateMany(
    { expiration_date: { $lte: new Date() } },
    { status: 'finished' }
  );
};

module.exports = mongoose.model('Voting', VotingSchema);
