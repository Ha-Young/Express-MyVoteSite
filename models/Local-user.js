const mongoose = require('mongoose');

const LocalUserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const LocalUser = mongoose.model('localUser', LocalUserSchema);
module.exports = LocalUser;
