const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expiration_date: {
    type: Date,
    required: true
  },
  options: [
    {
      title: { type: String, required: true },
      people: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Vote', voteSchema);
