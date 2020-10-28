const Voting = require('../models/Voting');
const User = require('../models/User');
const dayjs = require('dayjs');

async function sortVotings(conditionObj) {
  const votings = await Voting.find(conditionObj);
  const openVotings = [];
  const expiredVotings = [];

  for (voting of votings) {
    const creator = await User.findById(voting.created_by);
    const expirationDate = Date.parse(voting.expires_at);
    const formattedExpirationDate = dayjs(expirationDate).format('YYYY-MM-DD HH:mm');
    const data = {
      voting,
      creatorUsername: creator.username,
      formattedExpirationDate,
    };

    if (expirationDate > Date.now()) {
      openVotings.push(data);

      continue;
    }

    expiredVotings.push(data);
  }

  return [openVotings, expiredVotings];
}

module.exports = sortVotings;
