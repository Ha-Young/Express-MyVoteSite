const mongoose = require('mongoose');
 
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
  voted: [
    {
      type: mongoose.ObjectId,
      ref: 'Voting',
    }
  ],
});

module.exports = mongoose.model('User', userSchema);
