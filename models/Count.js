const mongoose = require('mongoose');

// create voting Schema
const countSchema = new mongoose.Schema({
  addCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Count', countSchema);
