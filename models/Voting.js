const mongoose = require("mongoose");
const { format } = require("date-fns");

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

votingSchema.virtual("isCurrent").get(function() {
  return new Date(this.expired_at) > new Date();
});

votingSchema.virtual("formatedExpiration").get(function() {
  return format(this.expired_at, "yyyy.MM.dd hh:mm");
});

module.exports = mongoose.model("Voting", votingSchema);
