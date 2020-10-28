const mongoose = require('mongoose');

const { ObjectId, } = mongoose.SchemaTypes;

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  voted: [{
    type: ObjectId,
    ref: 'Voting',
  },],
}, { timestamps: true, });

module.exports = mongoose.model('User', UserSchema);
