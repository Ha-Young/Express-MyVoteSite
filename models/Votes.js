const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: true,
};

const VoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  expired: {
    type: Boolean,
    require: true,
    default: false,
  },
  expirationDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  options: [{
      desc: {
        type: String,
        require: true,
      },
      voter: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
      }],
  }],
}, schemaOptions);

module.exports = new mongoose.model('Votes', VoteSchema);
