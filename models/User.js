const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vote',
    }
  ]
});

userSchema.pre('save', function(next) {
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

module.exports = mongoose.model('User', userSchema);
