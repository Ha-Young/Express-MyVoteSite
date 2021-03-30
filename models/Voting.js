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
  endDate: {
    type: String,
    required: true,
  },
  isProgress: {
    type: Boolean,
    default: true,
  },
  options: [{
    optionTitle: { type: String },
    optionValue: { type: Number, default: 0 },
  }],
  votingUserList:
    [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
});

module.exports = mongoose.model("Voting", VotingSchema);
