const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  name: { type: String, required: true },
  myVoteList: [
    {
      type: ObjectId,
      ref: 'Vote'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
