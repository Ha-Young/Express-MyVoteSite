const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const votingSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    end_at: {
      required: true,
      type: Date
    },
    creator: {
      required: true,
      type: Types.ObjectId,
      ref: 'User'
    },
    items: [
      {
        text: String,
        voters: [ {
          type: Types.ObjectId,
          ref: 'User'
        }]
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Voting', votingSchema);
