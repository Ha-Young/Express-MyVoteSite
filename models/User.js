const mongoose = require("mongoose");

const User = mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created_votings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voting",
    },
  ],
});

module.exports = mongoose.model("user", User);
