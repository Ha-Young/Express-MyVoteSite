const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  userIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Voting', votingSchema);
