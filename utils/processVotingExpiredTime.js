const dateFormat = require('dateformat');
const isVotingExpired = require('../utils/isVotingExpired');

function processVotingExpiredTime(votingData) {
  votingData.isVotingClosed = isVotingExpired(votingData.expiredTime);
  votingData.expiredTime = dateFormat(
    votingData.expiredTime,
    'yyyy-mm-dd h:MM'
  );
}

module.exports = processVotingExpiredTime;
