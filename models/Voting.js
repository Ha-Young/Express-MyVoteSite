const mongoose = require('mongoose');
 
const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  made: {
    type: mongoose.ObjectId,
    ref: 'User',
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
  },
});

module.exports = mongoose.model('Voting', votingSchema);
