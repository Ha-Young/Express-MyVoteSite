const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    expiration: { type: Date, required: true },
    items: [
      {
        option: { type: String, required: true },
        voters: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
      }
    ]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Voting', votingSchema);
