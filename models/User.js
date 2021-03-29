const mongoose = require("mongoose");

const createdVoteSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String
  },
  created_votes: [createdVoteSchema]
});

module.exports = mongoose.model("User", userSchema);
