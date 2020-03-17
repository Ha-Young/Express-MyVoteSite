const mongoose = require('mongoose');
 
const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  made: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  options: {
    type: Map,
    of: Number,
    required: true,
  },
});

module.exports = mongoose.model('Voting', votingSchema);
