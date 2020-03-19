const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  votingList: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Voting' }],
  hash: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

module.exports = mongoose.model('User', userSchema);
