const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  myVotings: []
});

module.exports = mongoose.model("User", User);
