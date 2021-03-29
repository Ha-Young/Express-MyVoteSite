const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  title: String,
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  isInProgress: Boolean,
  expiration: Date,
  createdAt: Date,
});

module.exports = mongoose.model("Vote", VoteSchema);
