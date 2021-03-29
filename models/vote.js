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
  expiredTime: {
    type: Date,
    required: true,
  },
  isProceeding: {
    type: Boolean,
    defualt: true,
    required: true,
  },
  options: [{
    text: String,
    count: {
      type: Number,
      default: 0,
    },
  }],
});

module.exports = new mongoose.model('Vote', voteSchema);
