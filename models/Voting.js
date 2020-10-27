const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    votes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  { _id: false }
);

const votingSchema = new mongoose.Schema({
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
  isActivated: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Voting', votingSchema);
