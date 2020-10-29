const Voting = require('../models/Voting');
const User = require('../models/User');
const dayjs = require('dayjs');

async function categorizeVotingsByExpiration(userIdObj, isFindAll = true) {
  const openVotings = [];
  const expiredVotings = [];
  let votings;

  if (isFindAll) {
    votings = await Voting.find();
  } else {
    votings = await Voting.find(userIdObj);
  }

  for (voting of votings) {
    const creator = await User.findById(voting.created_by);
    const userIsCreator
      = voting.created_by.toString() === userIdObj.created_by;
    const expirationDate = Date.parse(voting.expires_at);
    const formattedExpirationDate = dayjs(expirationDate).format('YYYY년 M월 D일 HH시 mm분');

    let votesOfMostVoted = voting.options[0].voters.length;

    for (let i = 1; i < voting.options.length; i++) {
      if (voting.options[i].voters.length > votesOfMostVoted) {
        votesOfMostVoted = voting.options[i].voters.length;
      }
    }

    const mostVoted = [];

    for (option of voting.options) {
      if (option.voters.length === votesOfMostVoted) {
        mostVoted.push(option.content);
      }
    }

    const data = {
      voting,
      userIsCreator,
      creatorUsername: creator.username,
      formattedExpirationDate,
      mostVoted,
    };

    if (expirationDate > Date.now()) {
      openVotings.push(data);

      continue;
    }

    expiredVotings.push(data);
  }

  return [openVotings, expiredVotings];
}

module.exports = categorizeVotingsByExpiration;
