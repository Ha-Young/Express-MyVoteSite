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

userSchema.statics.authenticate = (email, password, done) => {
  User.findOne({ email })
    .exec((err, user) => {
      if (err) {
        done(err);

        return;
      }

      if (!user) {
        const error = new Error('User not found');
        error.status = 401;
        done(error);

        return;
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          done(null, user);

          return;
        }

        done();
      });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
