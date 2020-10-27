const mongoose = require('mongoose');

const option = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
  votings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voting'
  }],
}, option);

module.exports = mongoose.model('User', userSchema);
