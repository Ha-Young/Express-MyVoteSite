const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  id: Number,
  title : String,
  completed_status: Boolean,
  description: String,
});

module.exports = mongoose.model('vote', VoteSchema);
