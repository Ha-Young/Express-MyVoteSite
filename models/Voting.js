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
    option: { type: String },
    count: { type: Number }
  }]
});

module.exports = mongoose.model('Voting', VotingSchema);
