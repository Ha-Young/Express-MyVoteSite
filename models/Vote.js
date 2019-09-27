const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  proceeding: {
    type: Boolean,
    default: true
  },
  options: [
    {
      name: {
        type: String,
        require: true
      },
      member: [{
        type: mongoose.Types.ObjectId
      }]
    }
  ]
});

module.exports = mongoose.model('Vote', VoteSchema);
