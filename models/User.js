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
  password: {
    type: String
  },
  profile_image: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  }
});

module.exports = mongoose.model('User', userSchema);;
