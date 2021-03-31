const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creater: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    nickname: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  convertedExpiredAt: {
    type: String,
    required: true,
  },
  isProceeding: {
    type: Boolean,
    default: true,
    required: true,
  },
  optionType: {
    type: String,
    required: true,
  },
  options: [{
    text: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
  }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

module.exports = new mongoose.model('Vote', voteSchema);
