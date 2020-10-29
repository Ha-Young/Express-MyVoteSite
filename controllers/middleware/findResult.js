const Voting = require('../../models/votingsModel');
const User = require('../../models/usersModel');

module.exports = async (req, res, next) => {
  const votingId = req.params.id;
  const voting = await Voting.findById(votingId);

  const byOptions = await voting.sperateOption(votingId);

  //result
  // sperated
  // max
  next();
};
