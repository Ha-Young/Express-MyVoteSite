const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const votingSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  end_at: {
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
      voters: [ Types.ObjectId ]
    }
  ]
}, { timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}});

module.exports = mongoose.model('Voting', votingSchema);
