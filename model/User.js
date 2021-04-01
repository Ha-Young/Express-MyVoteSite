const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  _salt: {
    type: String,
    required: [true, "salt is required"],
  },
  user_name: {
    type: String,
    required: [true, "user_name is required"],
  },
  votings: [{
    _id: false,
    voteId: {
      type: mongoose.ObjectId,
      ref: "Vote",
      required: [true, "voteId in votings is required"],
    },
    optionId: mongoose.ObjectId,
    isCreator: Boolean,
  }],
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("User", UserSchema);
