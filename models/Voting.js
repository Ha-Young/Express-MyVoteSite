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
    title: { type: String, trim: true, required: true },
    count: { type: Number, default: 0 }
  }]
});

votingSchema.virtual('selected_option').get(function () {
  const optionsCopy = [...this.options];

  return optionsCopy.sort((a, b) => b.count - a.count)[0].title;
});

votingSchema.statics.updateExpiredVotingStatus = function (now) {
  return this.updateMany(
    { expiration_date: { $lte: now } },
    { status: 'expired' }
  );
};

votingSchema.statics.addVoteCount = function (votingId, target) {
  return this.findOneAndUpdate(
    { _id: votingId, 'options.title': target },
    { $inc: { 'options.$.count': 1 } }
  );
};

votingSchema.methods.isExistOption = function (target) {
  return this.options.some(option => option.title === target);
};

module.exports = mongoose.model('Voting', votingSchema);
