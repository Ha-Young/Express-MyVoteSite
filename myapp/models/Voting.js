const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String },
  description: { type: String },
  votingItem: [{ item: { type: String }, count: { type: Number } }],
  voters: [mongoose.Schema.Types.ObjectId],
  // postTime: { type: String, default: Date.now },
  // dueTime: { type: String, default: Date.now },
});

module.exports = mongoose.model("Voting", votingSchema);
