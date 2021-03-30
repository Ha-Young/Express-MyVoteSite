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
  status: {
    agreeCount: {
      type: Number,
      default: 0,
    },
    disAgreeCount: {
      type: Number,
      default: 0,
    },
  },
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

module.exports = mongoose.model("Vote", VoteSchema);
