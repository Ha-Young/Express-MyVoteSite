const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  myVotings: [{
    type: Schema.Types.ObjectId,
    ref: 'Voting',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
