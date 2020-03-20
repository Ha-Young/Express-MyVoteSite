const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { VOTING_STATUSES } = require('../constants/enums');

const notEmpty = function(tests){
  return tests.length !== 0;
};

const votingSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  choices: {
    type: [{
      name: {
        type: String,
        required: true
      }
    }],
    required: true,
    validate: [notEmpty, 'Please add at least one choice']
  },
  end_time: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: [ VOTING_STATUSES.ACTIVE, VOTING_STATUSES.ENDED ],
    default: VOTING_STATUSES.ACTIVE,
    required: true,
  },
  votes: {
    type: [{
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      choice: {
        type: String,
        required: true
      }
    }]
  }
});

module.exports = mongoose.model('Voting', votingSchema);
