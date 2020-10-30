const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  voteId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }]
});

module.exports = mongoose.model('User', userSchema);
