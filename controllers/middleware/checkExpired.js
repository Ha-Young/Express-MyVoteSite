const Voting = require('../../models/votingsModel');

module.exports = async (req, res, next) => {
  const presentTime = new Date().toISOString();
  const updated = Voting.updateMany({
    expireDate: { $lt: presentTime },
    isExpired: true,
  });

  next();
};
