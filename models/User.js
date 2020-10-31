const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trin: true,
  },
  votings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voting',
    }
  ]
});

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      next(err);

      return;
    }

    user.password = hash;

    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
