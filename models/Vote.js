const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const voteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    creator_id: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    end_date: {
      type: Date,
      required: true
    },
    options: [{
      text: {
        type: String,
        trim: true,
        required: true
      },
      voting_users: [{
        type: ObjectId,
        ref: 'User'
      }]
    }]
  },
  {
    timestamps: { createdAt: 'created_at' }
  }
);

module.exports = mongoose.model('Vote', voteSchema);
