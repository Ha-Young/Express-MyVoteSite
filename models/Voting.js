const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: {
    type: String,
    require: true,
  },
  votingTitle: {
    type: String,
    require: true,
  },
  expirationDate: {
    type: String,
    require: true,
  },
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  }],
});

module.exports = mongoose.model('Voting', votingSchema);
