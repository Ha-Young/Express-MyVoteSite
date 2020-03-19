import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  doneVotes: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Vote'
    }],
    default: []
  },
  ownVotes: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Vote'
    }]
  }
});


schema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', schema);

export default User;
