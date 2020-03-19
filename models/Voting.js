const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
