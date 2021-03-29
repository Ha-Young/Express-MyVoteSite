const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true, required: true, trim: true },
  password: { type: String, required: true, minLength: 8 },
  name: { type: String, required: true, trim: true },
  voting_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voting' }]
});

module.exports = mongoose.model('User', UserSchema);
