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

UserSchema.statics.authenticate = async (email, password, callback) => {
  try {
    const returnErr = () => {
      let err = new Error('Invalid email or password');
      err.status = 401;
      return err;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw err;
    } else {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) return callback(null, user);
        else return callback(returnErr);
      });
    }
  } catch(err) {
    callback(err);
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
