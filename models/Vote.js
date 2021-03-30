const mongoose = require('mongoose');
const validator = require('validator');

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide the title'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the author']
  },
  expiration_date: {
    type: Date,
    required: [true, 'Please provide the expiration date'],
    validate: [validator.isDate, 'Please provide a valid expiration date']
  },
  status: {
    type: String,
    enum: ['in progress', 'terminated'],
    default: 'in progress'
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
