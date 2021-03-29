const mongoose = require("mongoose");

const votingOptionsSchema = new mongoose.Schema({
  voting_option: {
    type: String,
    unique: true,
    voters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    }],
  },
}, { _id: false });

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  proponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expired_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  is_voting: {
    type: Boolean,
    default: true,
  },
  voting_options: [votingOptionsSchema],
    // minLength: [2, "Should have more then two oprions"],
}, { timestamps: true });

module.exports = mongoose.model("Voting", votingSchema);
