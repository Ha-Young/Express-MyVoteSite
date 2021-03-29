const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "vote must have title"]
  },
});

module.exports = mongoose.model("vote", voteSchema);
