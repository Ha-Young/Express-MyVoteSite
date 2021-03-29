const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  voters: new mongoose.Schema([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]),
  _id: false
});

const voteSchema = new mongoose.Schema({
  expiration_date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  options: [optionSchema],
  all_voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Vote", voteSchema);
