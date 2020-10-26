const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trin: true,
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vote',
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
