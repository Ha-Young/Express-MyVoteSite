const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  due_date: {
    type: Date,
    default: Date.now,
    requried: true,
  },
  options: [{
    optionTitle: {
      type: String,
      required: true,
    },
    votedCount: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
  }],
  voter: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Vote', VoteSchema);
