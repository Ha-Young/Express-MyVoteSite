const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  creator: {
    type: mongoose.ObjectId,
    ref: "User",
    required: [true, "creator is required"],
  },
  options: [{
    title: String,
    select_users: [{
      type: mongoose.ObjectId,
      ref: "User",
    }],
  }],
  expire_at: Date,
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("Vote", VoteSchema);
