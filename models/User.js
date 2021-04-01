const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  myVotings: [mongoose.Schema.Types.ObjectId],
  likes: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
