const mongoose = require('mongoose');
const validator = require('validator');
const createError = require('http-errors');

const generateDateTimeString = require('../utils/generateDateTimeString');

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
  expirationDate: {
    type: Date,
    required: [true, 'Please provide the expiration date'],
    validate: [validator.isDate, 'Please provide a valid expiration date']
  },
  status: {
    type: String,
    enum: {
      values: ['in progress', 'terminated'],
      message: 'status is either: progress, terminated'
    },
    default: 'in progress'
  },
  options: {
    type: [mongoose.Schema.Types.Mixed],
    required: [true, 'Please provide vote options']
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

voteSchema.pre(/^find/, async function (next) {
  try {
    await Vote.updateMany({ expirationDate: { $lte: new Date() } }, { status: 'terminated' });
    next();
  } catch (err) {
    next(createError(500));
  }
});

voteSchema.post(/^find/, function (docs, next) {
  if (!docs) {
    return next();
  }

  if (!Array.isArray(docs)) {
    docs.expirationDate = generateDateTimeString(docs.expirationDate);
    return next();
  }

  docs.forEach(doc => {
    doc.expirationDate = generateDateTimeString(doc.expirationDate);
  });
  return next();
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
