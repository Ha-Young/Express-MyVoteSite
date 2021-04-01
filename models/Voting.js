/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  isInProgress: {
    type: Boolean,
    default: true,
  },
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  options: [{
    opt: String,
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  }],
}, { timestamps: true });

// eslint-disable-next-line prefer-arrow-callback
votingSchema.pre(/^find/, async function (next) {
  await Voting.updateMany({ dueDate: { $lte: new Date() } }, { isInProgress: false });
  next();
});

const Voting = mongoose.model('Voting', votingSchema);
module.exports = Voting;
