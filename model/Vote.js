const mongoose = require("mongoose");

const Choice = new mongoose.Schema({
  choiceTitle: String,
  selectUser: [mongoose.Types.ObjectId],
  description: String,
  pictureURL: String
});

const Vote = new mongoose.Schema({
  title: String,
  createAt: Date,
  dueDate: Date,
  isEnable: Boolean,
  choices: [Choice],
  tags: [String]
});

module.exports = mongoose.model("Vote", Vote);
