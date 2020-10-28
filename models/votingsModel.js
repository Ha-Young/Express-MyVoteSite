const mongoose = require('mongoose');
const User = require('./usersModel');

const selectOptionsSchema = new mongoose.Schema({
  option: String,
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
  votedUsers: Array,
});

votingSchema.methods.findMax = async (id) => {
  const max = await Voting.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $unwind: '$selectOptions',
    },
    {
      $group: {
        _id: null,
        max: { $max: '$selectOptions.count' },
      },
    },
  ]);
  return max[0];
};

const Voting = mongoose.model('Voting', votingSchema);

module.exports = Voting;
