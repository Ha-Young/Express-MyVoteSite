const mongoose = require('mongoose');

answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  }
});

const pollSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  isInProgress: {
    type: Boolean,
    default: true,
  },
  expiringTime: {
    type: Date, 
  },
  finishedUsers: {
    type: Array,
    default: [],
  },
  answers: [answerSchema],
});

module.exports = mongoose.model('Poll', pollSchema);
