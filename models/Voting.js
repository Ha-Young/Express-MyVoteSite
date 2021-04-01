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
  participants: [mongoose.Schema.Types.ObjectId],
  options: [{
    opt: String,
    likes: Number,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Voting', votingSchema);
