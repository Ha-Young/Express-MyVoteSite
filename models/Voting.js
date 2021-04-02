const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  source: {
    name: { type: String, required: true }
  },
  author: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String },
  publishedAt: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Voting", votingSchema);
