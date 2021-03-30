const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

const VoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true
  },
  options: [OptionSchema]
});

module.exports = mongoose.model("Vote", VoteSchema);
