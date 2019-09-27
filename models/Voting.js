const mongoose = require('mongoose');
const { votingStatus } = require('./constants/constants');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: [votingStatus.EXPIRED, votingStatus.INPROGRESS],
    default: votingStatus.INPROGRESS
  },
  expired_at: {
    type: Date,
    required: true,
    validate: (date) => new Date() < new Date(date)
  },
  selections: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    voter: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Voting', votingSchema);
