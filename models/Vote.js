const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.ObjectId,
    required: true
  },
  selections: [{
    content: {
      type: String,
      required: true
    },
    selected: {
      type: Number,
      default: 0,
      min: 0
    }
  }],
  expired_date: {
    type: Date,
    required: true
  },
  in_progress: {
    type: Boolean,
    required: true
  }

});

module.exports = mongoose.model('Vote', VoteSchema);
