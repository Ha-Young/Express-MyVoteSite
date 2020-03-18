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
  deadline: {
    type: Date,
    requierd: true
  },
  is_expired: {
    type: Boolean,
    default: false,
    required: true
  },
  voted_user: [
    {
      type: mongoose.Types.ObjectId
    }
  ]
});

module.exports = mongoose.model('Voting', votingSchema);
