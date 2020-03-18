const mongoose = require('mongoose');

const votingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  count: { type: Number, required: true },
  endDate: { type: String, required: true },
  joinUser: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  item: [
    {
      item: { type: String, required: true },
      count: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Voting', votingSchema);
