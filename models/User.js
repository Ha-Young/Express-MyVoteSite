const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, 'Email required'],
    match: [/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, 'Not a valid email']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password required']
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Name required'],
    match: [/^[가-힣]{2,4}|[a-zA-Z]{2,20}$/, 'Not a valid name']
  }
});

module.exports = mongoose.model('User', userSchema);
