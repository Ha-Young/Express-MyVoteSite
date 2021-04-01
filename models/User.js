const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  voting_list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voting'
  }]
});

UserSchema.methods.isAlreadyVote = function(id) {
  return this.voting_list.includes(id);
};

UserSchema.methods.addVotingList = function(id) {
  this.voting_list.push(id);
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
