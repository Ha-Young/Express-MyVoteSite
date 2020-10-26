const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  displyName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
