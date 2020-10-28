const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const voteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: ObjectId, ref: 'User' },
    expireAt: { type: Date, required: true },
    candidateList: [
      {
        title: { type: String, required: true },
        count: { type: Number, required: true }
      }
    ],
    participatedUser: [
      {
        type: ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

voteSchema.virtual('isExpired').get(function () {
  return Date.now() > new Date(this.expireAt).getTime();
});

module.exports = mongoose.model('Vote', voteSchema);
