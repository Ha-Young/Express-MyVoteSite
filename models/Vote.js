const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectionSchema = new Schema({
  subTitle: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

const authorSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  objectIdInDB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const voteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  selections: [selectionSchema],
  dueDate: {
    type: Date,
    required: true
  },
  author: authorSchema,
  voter: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Vote', voteSchema);
