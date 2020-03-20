import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  my_voting_list: [{
    type: Schema.Types.ObjectId,
    ref: 'Voting'
  }]
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default model('User', userSchema);
