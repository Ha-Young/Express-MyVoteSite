const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotingSchema = new Schema({
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
  dueDate: {
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

module.exports = mongoose.model('Voting', VotingSchema);
