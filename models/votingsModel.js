const mongoose = require('mongoose');
const User = require('./usersModel');

const selectOptionsSchema = new mongoose.Schema({
  name: String,
  count: {
    type: Number,
    default: 0,
  },
});

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  selectOptions: {
    type: [selectOptionsSchema],
    validate: {
      validator: function () {
        return this.selectOptions.length > 1;
      },
      message: 'selectOptions should more than 2',
    },
  },

  // selectOptions: {
  //   type: Array,
  //   validate: {
  //     validator: function () {
  //       return this.selectOptions.length > 1;
  //     },
  //     message: 'selectOptions should more than 2',
  //   },
  // },
  expireDate: Date,
  isExpired: {
    type: Boolean,
    default: false,
  },
  creator: String,
});

const Voting = mongoose.model('Voting', votingSchema);

module.exports = Voting;
