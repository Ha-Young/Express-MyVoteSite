const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    max: 12,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  votings: [{ type: Schema.Types.ObjectId, ref: "voting" }],
});

module.exports = mongoose.model("User", userSchema);
