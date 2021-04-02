const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  myVotingList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Voting",
    default: [],
  },
  votingsCreatedByMe: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Voting",
    default: [],
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
