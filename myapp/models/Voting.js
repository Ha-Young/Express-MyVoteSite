const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  author: { type: String, default: "anonymity" },
  title: { type: String },
  description: { type: String },
  votingItems: [{ item: { type: String }, count: { type: Number } }],
  voters: [mongoose.Schema.Types.ObjectId],
  startTime: { type: Date, default: new Date().toISOString() },
  endTime: { type: Date, default: new Date().toISOString() },
});

module.exports = mongoose.model("Voting", votingSchema);