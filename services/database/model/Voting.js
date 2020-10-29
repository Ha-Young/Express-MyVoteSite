const mongoose = require('mongoose');

const { ObjectId, } = mongoose.SchemaTypes;

const PollSchema = new mongoose.Schema({
  poll_title: {
    type: String,
    required: true,
    trim: true,
  },
  voted_users: [{
    type: ObjectId,
    ref: 'User',
  },],
}, { timestamps: true, });

const VotingSchema = new mongoose.Schema({
  voting_title: {
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
    type: String,
    required: true,
  },
  polls: [ PollSchema,],
}, { timestamps: true, });

module.exports = mongoose.model('Voting', VotingSchema);
