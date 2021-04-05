const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  generator: { type: String, required: true },
  expiryDate: { type: Date, default: Date.now },
  options: [{
    option: { type: String, required: true },
    count: { type: Number, default: 0 },
  }],
  isInProgress: { type: Boolean, default: true },
});

module.exports = mongoose.model("Voting", votingSchema);
