const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    match: [/^[a-zA-Z0-9]+$/, 'only alphabets and numbers are allowed to username.'],
    minlength: 4
  },
  firstname: {
    type: String,
    lowercase: true,
    required: [ true, 'first name can\'t be blank.' ],
    match: [/^[a-zA-Z]+$/, 'only alphabets are allowed to first name.']
  },
  lastname: {
    type: String,
    lowercase: true,
    required: [ true, 'last name can\'t be blank.' ],
    match: [/^[a-zA-Z]+$/, 'only alphabets are allowed to first name.']
  },
  email : {
    type: String,
    minlength: 10,
    lowercase: true,
    unique: true,
    required: [ true, 'email can\'t be blank.' ],
    match: [/\S+@\S+\.\S+/, 'email field should include "@".'],
    index: true
  },
  password: {

  },
  gender: {
    type: String,
    enum: [ 'male', 'female', 'etc.' ],
    required: true
  },
  votes_created: [{
    type: mongoose.Types.ObjectId,
    ref: 'Votes'
  }],
  voted_voted: [{
    type: mongoose.Types.ObjectId,
    ref: 'Votes'
  }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', UserSchema);
