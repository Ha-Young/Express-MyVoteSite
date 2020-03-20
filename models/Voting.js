const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiredAt: {
    type: Date,
    required: true
  },
  isProceeding: {
    type: Boolean,
    required: true,
    default: true
  },
  options: [
    {
      option: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true,
        default: 0,
        min: 0
      }
    }
  ],
  result: {
    option: {
      type: String,
      default: null
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    }
  }
});

module.exports = mongoose.model('Voting', VotingSchema);
