const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const votingSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  createdAt: {
    required: true,
  },
  expiresAt: {
    required: false,
    type: Date
  },
  creator: {
    required: true,
    type: Types.ObjectId
  },
  items: [
    {
      text: String,
      voters: [ { voter_id: Types.ObjectId } ]
    }
  ]
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Voting', votingSchema);
