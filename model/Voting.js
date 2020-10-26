const mongoose = require('mongoose');

const PollSchema = require('./Poll');

const { ObjectId, } = mongoose.SchemaTypes;

const VotingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  creator: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  expiration_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  polls: [ PollSchema,],
}, { timestamps: true, });

module.exports = mongoose.model('Voting', VotingSchema);
