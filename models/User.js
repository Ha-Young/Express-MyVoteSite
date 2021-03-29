const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar_url: { type: String },
  password: { type: String },
}, {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
});

module.exports = mongoose.model("User", UserSchema);
