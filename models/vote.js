const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiredDate: {
    type: Date,
    required: true,
  },
  isProceeding: {
    type: Boolean,
    defualt: true,
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
