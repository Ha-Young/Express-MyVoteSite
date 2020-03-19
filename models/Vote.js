const mongoose = require('mongoose');

const today = new Date();

const VoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    _id: mongoose.ObjectId,
    name: String
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
  voters: [mongoose.ObjectId],
  expired_date: {
    type: Date,
    min: new Date(today.getTime() + 10 * 60 * 1000),
    required: true
  },
  in_progress: {
    type: Boolean,
    required: true
  }

});

module.exports = mongoose.model('Vote', VoteSchema);
