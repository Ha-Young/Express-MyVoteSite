const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  votes: [],
  refreshToken: String
});

module.exports = mongoose.model("User", User);
