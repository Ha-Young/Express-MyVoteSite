const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const GoogleUserSchema = new Schema({
  userName : String,
  googleId: String,
  thumbnail: String,
  locale: String
});

const GoogleUser = mongoose.model('googleUser', GoogleUserSchema);
module.exports = GoogleUser;
