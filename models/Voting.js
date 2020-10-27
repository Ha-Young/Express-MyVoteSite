const mongoose = require('mongoose');

const option = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const votingSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: {
    type: String,
    require: true,
  },
  votingTitle: {
    type: String,
    require: true,
  },
  expirationDate: {
    type: String,
    require: true,
  },
  options: [
    {
      option: {
        type: String,
        require: true,
      },
      voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    }
  ],
}, option);

module.exports = mongoose.model('Voting', votingSchema);
