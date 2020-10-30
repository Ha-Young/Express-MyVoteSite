const processVotingExpiredTime = require('../utils/processVotingExpiredTime');

function processVotingDetailData(votingData, userId, username) {
  const votingDetailData = {
    title: votingData.title,
    creator: votingData.creator,
    votingId: votingData._id,
    votingLists: votingData.votingLists,
    expiredTime: votingData.expiredTime,
  };

  votingDetailData.isUserCreator = username === votingData.creator;
  votingDetailData.isUserParticipated = votingData.participants.includes(
    userId && userId.toString()
  );

  processVotingExpiredTime(votingDetailData);

  return votingDetailData;
}

module.exports = processVotingDetailData;
