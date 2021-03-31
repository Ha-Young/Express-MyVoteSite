const mongoose = require("mongoose");

// const solvedProblemSchema = require("./subSchema/SolvedProblem");
// const findOrCreate = require("mongoose-findorcreate");

const voterSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const votingOptionSchema = new mongoose.Schema({
  optionTitle: {
    type: String,
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
  isExpired: {
    type: Boolean,
    default: false,
    required: true,
  },
  votingOptions: {
    type: [votingOptionSchema],
    default: [votingOptionSchema, votingOptionSchema],
    required: true,
  },
}, { timestamps: true });


// userSchema.plugin(findOrCreate);
module.exports = mongoose.model("Voting", VotingSchema);
