const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  voter: {
    type: Object,
  },
  expirationTime: {
    type: Date,
    require: true,
  },
  options: {
    type: Map,
  },
  isAbleSelectMultipleOptions: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("Voting", votingSchema);
