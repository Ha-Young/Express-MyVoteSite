const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  githubId: { type: String },
  password: { type: String },
  completedVotes: [{ type: mongoose.Schema.Types.ObjectID, ref: "Vote" }],
}, {
  timestamps: { currentTime: () => Date.now() / 1000 },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
