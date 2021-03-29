const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true, required: true, trim: true},
  password: {type: String, required: true, minLength: 8},
  nick_name: {type: String, required: true, trim: true},
  vote_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }]
});

module.exports = mongoose.model('User', UserSchema);
