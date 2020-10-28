const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  expire_day : {
    type: String,
    required: true,
    trim: true
  },
  option: {
    type: Array,
    required: true,
    trim: true
  },
  creator: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Voting', votingSchema);
