const mongoose = require('mongoose');

const VotingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiration: { type: Date, required: true },
  progress: { type: String, required: true },
  options: [{ title: { type: String, required: true }, vote: { type: Number, required: true, default: 0 } }]
});

module.exports = mongoose.model('Votings', VotingSchema);
