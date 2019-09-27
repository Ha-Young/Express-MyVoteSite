const mongoose = require('mongoose');
/*

  TODO: Fill in the model specification

 */
const votingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    created_by_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    complete_at: {
      type: Date,
      required: true
    },
    is_completed: {
      type: Boolean,
      required: true
    },
    options: [
      {
        content: {
          type: String,
          require: true
        },
        index: {
          type: Number,
          required: true
        },
        chosen_by: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          }
        ]
      }
    ]
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('Voting', votingSchema);
