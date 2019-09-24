const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Option title required']
  },
  voted_user: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const voteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Title required']
  },
  expired_at: {
    type: Date,
    required: [true, 'Expiry Date required']
  },
  options: {
    type: [optionSchema],
    required: [true, 'Options required']
  }
});

module.exports = mongoose.model('Vote', voteSchema);
