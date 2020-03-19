const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  votes: {
    type: [{
      voting: {
        type: Schema.Types.ObjectId,
        ref: 'Voting' // this should be fixed later
      }
    }]
  }
});

module.exports = mongoose.model('User', userSchema);
