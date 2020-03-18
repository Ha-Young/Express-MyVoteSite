const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  items: [String],
  endDate: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Voting', votingSchema);
