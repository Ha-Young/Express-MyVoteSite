const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votingSchema = new Schema({
  title: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  expiration: {
    type: Date,
    default: Date.now,
    required: true
  },
  options: [
    {
      text: {
        type: String,
        required: true
      },
      selected_user: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        }
      ]
    }
  ]
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('Voting', votingSchema);
