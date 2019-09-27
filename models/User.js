const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email : {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
