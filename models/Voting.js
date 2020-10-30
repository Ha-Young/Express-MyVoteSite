const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const votingSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    author: ObjectId,
    description: String,
    expiredAt: {
      type: Date,
      default: new Date(+new Date() + 3 * 60 * 60 * 1000)
    },
    voters: [ { type: ObjectId, ref: 'User' } ],
    candidates: [
      {
        title: String,
        content: String,
        voters: [ { type: ObjectId, ref: 'User' } ]
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Voting', votingSchema);
