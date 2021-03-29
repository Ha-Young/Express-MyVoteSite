const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  }
}, { _id: false });

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  proponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expired_at: {
    type: Date,
    required: true,
  },
  is_voting: {
    type: Boolean,
    default: true,
  },
  options: {
    type: [optionSchema],
    required: true,
  },
  voters: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  }
}, { timestamps: true });

module.exports = mongoose.model("Voting", votingSchema);
