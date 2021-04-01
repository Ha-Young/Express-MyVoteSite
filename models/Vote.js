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
  expiredAt: {
    type: String,
    required: true
  },
  participated_users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  options: [OptionSchema]
});

module.exports = mongoose.model("Vote", VoteSchema);
