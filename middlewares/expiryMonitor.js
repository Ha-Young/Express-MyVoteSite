const Voting = require('../models/Voting');

async function expiryMonitor(req, res, next) {
  try {
    const filter = { $and: [
      { end_time: { $lte: new Date() } },
      { status: { $ne: 'DELETED' } }
    ]};
    const doc = { status : 'EXPIRED' };
    await Voting.updateMany(filter, doc);
  } catch (err) {
    console.log(err);
  }
  next();
}

exports.expiryMonitor = expiryMonitor;
