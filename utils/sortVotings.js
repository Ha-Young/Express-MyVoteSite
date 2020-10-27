const Voting = require('../models/Voting');

async function sortVotings() {
  const votings = await Voting.find();
  const openVotings = [];
  const expiredVotings = [];

  for (voting of votings) {
    if (Date.parse(voting.expires_at) > Date.now()) {
      openVotings.push(voting);

      continue;
    }

    expiredVotings.push(voting);
  }

  return [openVotings, expiredVotings];
}

module.exports = sortVotings;
