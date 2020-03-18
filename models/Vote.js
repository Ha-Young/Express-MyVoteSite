const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = mongoose.Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  creatorNickname: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  expirationDate: {
    type: Date,
    require: true
  },
  isExpired: {
    type: Boolean,
    require: true,
    default: false
  },
  options : [
    {
      optionTitle: {
        type: String,
        require: true
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
