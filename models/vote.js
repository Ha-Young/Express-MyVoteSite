const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "vote must have title"],
    unique: true
  },
  creator: {
    type: String,
    required: [true, "vote content must have creator info"]
  },
  endDate: {
    type: Date,
    required: [true, "vote must have an end date"]
  },
  isOnVote: {
    type: String,
    default: true
  },
  option: [{
    optionTitle: { type: String, required: [true, "vote must have an options"] },
    votedUsers: { type: Array, default: [] }
  }],
  votedUsersId: { type: Array, default: [] }
});

module.exports = mongoose.model("Vote", voteSchema);
