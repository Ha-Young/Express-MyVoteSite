const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registeredvotings: [{
    type: Schema.Types.ObjectId,
    ref: 'Voting',
    required: true
  }],
  participateVotings: [{
    voting: {
      type: Schema.Types.ObjectId,
      ref: 'Voting',
      required: true
    },
    selectedOption: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

UserSchema.methods.comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = mongoose.model('User', UserSchema);
