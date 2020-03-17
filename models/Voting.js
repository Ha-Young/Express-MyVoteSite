const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  selection_items: [
    {
      selection_item: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ],
  created_at: {
    type: Date
  },
  is_expired: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = mongoose.model('Voting', votingSchema);
