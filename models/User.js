const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.pre('save', function (next) {
  try {
    const SALT_ROUNDS = 10;
    const hash = bcrypt.hashSync(this.password, SALT_ROUNDS);

    this.password = hash;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
