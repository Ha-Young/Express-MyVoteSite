const mongoose = require("mongoose");
const User = require("./User");

const Choice = new mongoose.Schema({
  choiceTitle: {
    type: String,
    required: [true, "Choice Title is needed"],
  },
  selectUser: {
    type: [mongoose.Types.ObjectId],
    ref: User,
  },
  pictureURL: {
    type: String,
    default: "/images/skyPastelBlueWallpaper.jpg",
  }
});

const Vote = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Vote Title is needed"],
  },
  createAt: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: [true, "Due Date is needed"],
  },
  isEnable: {
    type: Boolean,
    default: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User,
  },
  thumbnailURL: {
    type: String,
    default: "/images/skyPastelBlueWallpaper.jpg",
  },
  choices: [Choice],
  tags: [String]
});

module.exports = mongoose.model("Vote", Vote);
