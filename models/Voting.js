const mongoose = require('mongoose');

const VotingSchema = new mongoose.Schema({
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
    expires: 10,
  },
  options: [
    {
      content: String,
      voters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        }
      ]
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Voting', VotingSchema);
