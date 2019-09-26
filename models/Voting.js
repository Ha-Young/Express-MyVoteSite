const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    validate: {
      validator: function(status) {
        return status === 'INPROGRESS' || status === 'EXPIRED';
      }
    },
    default: 'INPROGRESS'
  },
  expired_at: {
    type: Date,
    required: true
  },
  selections: [{
    name: {
      type: String,
      required: true
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
