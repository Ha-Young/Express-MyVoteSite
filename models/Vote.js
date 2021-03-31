const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A vote must have a title"],
  },
  creator: {
    index: true,
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  options: [{
    name: {
      type: String,
      required: [true, "A option of Vote must have name."],
    },
    voters: [{
      type: mongoose.Types.ObjectId,
      ref: "User",
    }],
  }],
  voters: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
  isInProgress: {
    type: Boolean,
    default: true,
  },
  expiration: {
    type: Date,
    required: [true, "A vote must have a expiration"],
    validate: {
      validator: function (el) {
        return this.createdAt < el;
      },
      message: "A expiration date must be after now.",
    },
  },
}, { timestamps: true });

// eslint-disable-next-line
VoteSchema.pre(/^find/, async function (next) {
  // eslint-disable-next-line
  await Vote.updateMany({ expiration: { $lte: new Date() }}, { isInProgress: false });
  next();
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
