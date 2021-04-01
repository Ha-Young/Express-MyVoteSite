const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  expiration_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['inprogress', 'expired'],
    default: 'inprogress',
    required: true
  },
  options: [{
    optionTitle: { type: String, trim: true, required: true },
    count: { type: Number, default: 0 }
  }]
});

votingSchema.virtual('selected_option').get(function() {
  const optionsCopy = [...this.options];

  return optionsCopy.sort((a, b) => b.count - a.count)[0].optionTitle;
});

votingSchema.methods.addVoteCount = function(target) {
  const targetOption = this.options.find(option => option.optionTitle === target);
  targetOption.count += 1;

  return this.save();
};

votingSchema.statics.updateExpiredVotingStatus = function (now) {
  return this.updateMany(
    { expiration_date: { $lte: now } },
    { status: 'expired' }
  );
};

module.exports = mongoose.model('Voting', votingSchema);
