const mongoose = require("mongoose");

const Choice = new mongoose.Schema({
  choiceTitle: {
    type: String,
    required: true,
  },
  selectUser: [mongoose.Types.ObjectId],
  description: String,
  pictureURL: String
});

const Vote = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isEnable: Boolean,
  choices: [Choice],
  tags: [String]
});

module.exports = mongoose.model("Vote", Vote);
