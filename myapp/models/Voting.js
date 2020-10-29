const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true
  }
});

const VotingSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  option: [optionSchema],
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  userVoted: [String]
}, { timestamps: true });

module.exports = mongoose.model('Voting', VotingSchema);
