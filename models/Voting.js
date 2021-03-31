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
  voters: {
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
}, { minimize: false });

module.exports = mongoose.model("Voting", votingSchema);
