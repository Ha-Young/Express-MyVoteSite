const mongoose = require('mongoose');

const { ObjectId, } = mongoose.SchemaTypes;

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  voted_users: [{
    type: ObjectId,
    ref: 'User',
  },],
}, { timestamps: true, });

module.exports = mongoose.model('Poll', PollSchema);
