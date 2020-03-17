const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
  // confirmPassword: { type: String, required: true }
});

// userSchema.plugin(passportLocalMongoose, { usernameField : 'email'});

module.exports = mongoose.model('User', userSchema);
