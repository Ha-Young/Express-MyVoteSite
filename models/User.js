const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: Number,
      default: null,
    },
    photoUrl: {
      type: String,
      default: null,
    },
    myVotings: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Voting',
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
