const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, maxlength:20, require: true },
  email: { type: String, require: true, unique: true, index: true, },
  password: { type: String, },
  isGoogleAccount: { type: Boolean, require: true },
});

module.exports = mongoose.model("User", userSchema);
