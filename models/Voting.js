const mongoose = require('mongoose');

const VotingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiration_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['inprogress', 'expired'],
    default: 'inprogress',
    required: true
  },
  options: [{
    optionTitle: { type: String, required: true },
    count: { type: Number, default: 0 }
  }]
});

VotingSchema.methods.addVoteCount = function(target) {
  const targetOption = this.options.find(option => option.optionTitle === target);
  targetOption.count += 1;

  return this.save();
};

VotingSchema.statics.updateExpiredVotingStatus = function(now) {
  return this.updateMany(
    { expiration_date: { $lte: now } },
    { status: 'expired' }
  );
};

module.exports = mongoose.model('Voting', VotingSchema);
