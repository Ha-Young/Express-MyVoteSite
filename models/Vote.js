const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { STATUS } = require('../constants/constants');

const optionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  voters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  check_count: {
    type: Number,
    default: 0
  }
});

const voteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  creater: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  expired_at: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: [STATUS.PROCEED, STATUS.EXPIRED],
    default: STATUS.PROCEED
  },
  options: {
    type: [optionSchema],
    required: true
  }
});

module.exports = mongoose.model('Vote', voteSchema);
