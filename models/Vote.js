const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  expiredAt: { type: Date, required: true },
  isExpired: { type: Boolean, required: true },
  candidateList: [
    {
      title: { type: String, required: true },
      counted: { type: Number, required: true }
    }
  ],
  participatedUser: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Vote', voteSchema);
