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
    type: Object,
    required: true,
  },
  dueDate: {
    type: Object,
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
