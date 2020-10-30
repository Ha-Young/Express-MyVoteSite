const processVotingExpiredTime = require('../utils/processVotingExpiredTime');

function processVotingData(votingData) {
  const progressedVotingData = [];
  const expiredVotingData = [];

  votingData.forEach((currentVotingData) => {
    processVotingExpiredTime(currentVotingData);

    currentVotingData.isVotingClosed
      ? expiredVotingData.push(currentVotingData)
      : progressedVotingData.push(currentVotingData);
  });

  return [...progressedVotingData, ...expiredVotingData];
}

module.exports = processVotingData;
