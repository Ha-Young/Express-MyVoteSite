const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const optionSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  voters: [voterSchema],
}, { timestamps: true });


const VotingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expireDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  isProceeding: {
    type: Boolean,
    default: true,
    required: true,
  },
  winner: {
    type: Array,
    default: [],
  },
  options: {
    type: [optionSchema],
    default: [optionSchema, optionSchema],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Voting", VotingSchema);
