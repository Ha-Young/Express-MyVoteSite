const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = mongoose.Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  creatorNickname: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  isExpired: {
    type: Boolean,
    required: true,
    default: false
  },
  options : [
    {
      optionTitle: {
        type: String
      },
      count: {
        type: Number,
        default: 0
      }
    }
  ],
  participants: [
    {
      type: Schema.ObjectId
    }
  ]
});

module.exports = mongoose.model('Vote', voteSchema);
