const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    require: true,
  },
  hash: {
    type: String,
    require: true,
  },
  salt: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  votings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voting",
    index: true,
    unique: true,
  }],
});

module.exports = mongoose.model("User", userSchema);
