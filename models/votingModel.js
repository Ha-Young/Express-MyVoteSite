const mongoose = require("mongoose");
// const validator = require("validator");
const { Schema } = mongoose;
const {
  Types: { ObjectId, Mixed },
} = Schema;

const OptionSchema = new Schema({
  name: Mixed,
  votee: {
    type: [ObjectId],
    ref: "User",
  },
});

const VotingSchema = new Schema({
  name: {
    type: String,
    required: [true, "A voting must have a name"],
    maxlength: [40, "A voting name must have less or equal than 40 characters"],
    minlength: [5, "A voting name must have more or equal than 5 characters"],
  },
  creator: {
    type: ObjectId,
    ref: "User",
    required: [true, "A voting must have a creator"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startAt: {
    type: Date,
    required: [true, "A voting must have a start date"],
    validate: {
      validator: (date) => date,
      message: "The start date must be lator than now",
    },
  },
  endAt: {
    type: Date,
    required: [true, "A voting must have a end date"],
    validate: {
      validator: (date) => date,
      message: "The end date must be lator than start date",
    },
  },
  status: {
    type: String,
    required: [true, "A voting must have status"],
    enum: {
      values: ["upcoming", "in progress", "ended", "canceled"],
      message:
        "Status is either: 'upcoming', 'in progress', 'ended', 'canceled'",
    },
  },
  options: {
    type: [OptionSchema],
    validate: {
      validator: (value) => value.length > 1,
      message: "A voting must have more or equal than 2 options",
    },
  },
});

const Voting = mongoose.model("Voting", VotingSchema);

module.exports = Voting;
