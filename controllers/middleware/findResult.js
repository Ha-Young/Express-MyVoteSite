const mongoose = require('mongoose');
const Voting = require('../../models/votingsModel');
const User = require('../../models/usersModel');

module.exports = async (req, res, next) => {
  const votingId = req.params.id;
  const byOptions = await Voting.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(votingId) },
    },
    {
      $unwind: '$selectOptions',
    },
  ]);
  //static methods or schema method
  const count = byOptions.map((voting) => {
    return voting.selectOptions.votedUsers.length;
  });
  const max = Math.max(...count)
  const maxOption = [];
  byOptions.forEach((voting) => {
    const count = voting.selectOptions.votedUsers.length;
    if (count === max) {
      maxOption.push(voting.selectOptions.option);
    }
  });

  req.body.voting = byOptions;
  req.body.maxCount = max;
  req.body.maxOption = maxOption;
  next();
};
