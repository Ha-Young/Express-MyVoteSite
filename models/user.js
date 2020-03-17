const mongoose = require('mongoose');

pollSchema = new mongoose.Schema({
  myPoll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
  }
});


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  myPolls: [pollSchema]
});

module.exports = mongoose.model('User', userSchema);
