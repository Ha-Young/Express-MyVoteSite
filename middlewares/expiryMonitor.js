const Voting = require('../models/Voting');
const { VOTING_STATUSES } = require('../constants/enums');

async function expiryMonitor(req, res, next) {
  try {
    const filter = { $and: [
      { end_time: { $lte: new Date() } },
      { status: { $ne: VOTING_STATUSES.ENDED } }
    ]};
    const doc = { status : VOTING_STATUSES.ENDED };
    await Voting.updateMany(filter, doc);
  } catch (err) {
    console.log(
      'Error occured while monitoring expiry & updating status accordingly',
      err
    );
  }
  next();
}

exports.expiryMonitor = expiryMonitor;
