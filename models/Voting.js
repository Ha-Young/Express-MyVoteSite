const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  items: [
    {
      name: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ],
  endDate: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  solvedUser: {
    type: [ String ],
    default: []
  }
});

module.exports = mongoose.model('Voting', votingSchema);
