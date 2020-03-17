const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  votes: [mongoose.ObjectId]
});

module.exports = mongoose.model('User', UserSchema);
