const Voting = require('../models/Voting');
const User = require('../models/User');
const dayjs = require('dayjs');

async function categorizeVotings(userIdObj, isFindAll = true) {
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
    const expirationDate = Date.parse(voting.expires_at);
    const formattedExpirationDate = dayjs(expirationDate).format('YYYY-MM-DD HH:mm');

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

    console.log('최다 득표 선택지 배열: ', mostVoted);

    const data = {
      voting,
      userIsCreator: voting.created_by.toString() === userIdObj.created_by,
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

module.exports = categorizeVotings;
