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
    required: [true, 'Password required'],
    match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/, 'Not a valid password']
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Name required'],
    match: [/^[가-힣]{2,4}|[a-zA-Z]{2,20}$/, 'Not a valid name']
  },
  salt: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('User', userSchema);
