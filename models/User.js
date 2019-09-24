const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('User', userSchema);
