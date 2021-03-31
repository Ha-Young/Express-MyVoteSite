const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number
  },
  _id: false
});

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  expiration_date: {
    type: Date,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  options: [optionSchema]
});

module.exports = mongoose.model("Vote", voteSchema);
