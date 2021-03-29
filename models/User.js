const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar_url: { type: String },
  password: { type: String },
}, {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
