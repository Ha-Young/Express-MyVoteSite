const mongoose = require("mongoose");

const Choice = new mongoose.Schema({
  choiceTitle: {
    type: String,
    required: true,
  },
  selectUser: [mongoose.Types.ObjectId],
  pictureURL: String
});

const Vote = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title이 반드시 필요합니다"],
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
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  choices: [Choice],
  tags: [String]
});

module.exports = mongoose.model("Vote", Vote);
