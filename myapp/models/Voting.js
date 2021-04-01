const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String },
  voting_items: [
    {
      item: { type: String },
      count: { type: Number },
      voters: [{ type: mongoose.Schema.Types.ObjectId }],
    },
  ],
  started_at: { type: Date, default: new Date().toISOString() },
  ended_at: { type: Date, default: new Date().toISOString() },
});

module.exports = mongoose.model("Voting", votingSchema);
