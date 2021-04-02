const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
