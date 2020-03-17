const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  nickname: { type: String, required: [true, 'nickname is required'], unique: true },
  email: { type: String, required: [true, 'email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  previousVisitURL: String,
  createdVotes: [
    { type: Schema.ObjectId, ref: 'Vote' }
  ]
});

module.exports = mongoose.model('User', userSchema);
