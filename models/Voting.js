const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  voteOptions: {
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Voting', votingSchema);
