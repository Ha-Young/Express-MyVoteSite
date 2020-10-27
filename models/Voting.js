const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  expires_at: {
    type: Date,
    required: true,
  },
  is_open: {
    type: Boolean,
    default: true,
  },
  options: {
    type: [],
    minLength: 2,
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
});

module.exports = mongoose.model('Voting', votingSchema);
