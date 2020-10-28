const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    description: String,
    expiredAt: {
      type: Date,
      default: new Date(+new Date() + 3 * 60 * 60 * 1000)
    },
    candidates: [
      {
        title: String,
        content: String,
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Voting', votingSchema);
