const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  title: {
    type: String,
    required: [ true, 'Vote title is required.' ],
    index: true,
  },
  select_options: [{
    description: {
      type: String,
      require: [ true, 'Should describe select option.' ]
    },
    vote_counter: {
      type: Number,
      default: 0
    },
    voter: [{
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      default: []
    }]
  }],
  total_voters: {
    type: Number,
    default: 0
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    require: [ true, 'Should include user who created this vote.' ]
  },
  expires_at: {
    type: Date,
    require: [ true, 'Should set expiration date.' ]
  },
  expired: {
    type: Boolean,
    default: false
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Votes', VoteSchema);
