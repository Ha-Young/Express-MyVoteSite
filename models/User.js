const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  github_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  voted_list: [],
  created_vote_list: [],
  password : {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
