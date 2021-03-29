const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VotingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  isProgress: {
    type: Boolean,
    default: true,
  },
  votingList: {
    type: Array,
    default: [],
  },
  votingUserList:
    [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
});

module.exports = mongoose.model("Voting", VotingSchema);
