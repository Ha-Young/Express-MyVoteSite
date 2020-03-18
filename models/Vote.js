const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  due: { type: Date, required: true },
  state: { type: String, enum: ["inProgress", "done"], required: true, default: "inProgress" },
  options: [{ option: { type: String, required: true }, count: { type: Number, default: 0 } }],
  participants: [String]
});

module.exports = mongoose.model("Vote", VoteSchema);
