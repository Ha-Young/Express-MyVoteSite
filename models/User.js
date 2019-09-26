const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  votings: Array
});

// Schema.pre needs regular function for callback
UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return callback(err)
    } else if (!user) {
      let err = new Error('Invalid email or password');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return callback(null, user);
      } else {
        return false;
      }
    });
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
