const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VoteSchema = new Schema({
  title: {
    type: String,
    unique: true,
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
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    require: [ true, 'Should include user who created this vote.' ]
  },
  expired_at: {
    type: Date,
    require: [ true, 'Should set expiration date.' ]
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.Model('Vote', VoteSchema);
