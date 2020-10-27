const mongoose = require('mongoose');
const User = require('./usersModel');

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  selectOptions: {
    type: Array,
    validate: {
      validator: function () {
        return this.selectOptions.length > 1;
      },
      message: 'selectOptions should more than 2',
    },
  },
  expireDate: Date,
  isFinished: {
    type: Boolean,
    default: false,
  },
  creator: String,
});

votingSchema.pre(/^find/, function () {});

const Voting = mongoose.model('Voting', votingSchema);

module.exports = Voting;
