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
  votings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voting'
    }
  ]
});

// Schema.pre needs regular function for callback
UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email: email }).exec((err, user) => {
    const returnErr = () => {
      let err = new Error('Invalid email or password');
      err.status = 401;
      return err;
    }
    if (err) return callback(err);
    if (!user) return callback(returnErr);

    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) return callback(null, user);
      else return callback(returnErr);
    });
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
