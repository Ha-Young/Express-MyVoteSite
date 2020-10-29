const mongoose = require('mongoose');
const { isFuture, formatDistanceToNow } = require('date-fns');

const optionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const votingSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    options: {
      type: [optionSchema],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
    voters: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  { timestamps: true }
);

votingSchema.virtual('isOngoing').get(function () {
  return isFuture(this.expiration);
});

votingSchema.virtual('timeRemaining').get(function () {
  return formatDistanceToNow(this.expiration);
});

votingSchema.method('isMine', function (userId) {
  return userId.equals(this.author);
});

votingSchema.method('isParticipated', function (userId) {
  return this.voters.some(voter => voter.equals(userId));
});

module.exports = mongoose.model('Voting', votingSchema);
