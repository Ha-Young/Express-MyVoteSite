const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String
  },
  expired_at: {
    type: Date,
    required: true
  },
  options: [
    {
      text: {
        type: String,
        required: true
      },
      voted_users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    }
  ]
},
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Vote', voteSchema);
