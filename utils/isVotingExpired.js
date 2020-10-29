function isVotingExpired(votingData) {
  const { expiredTime } = votingData;
  const isExipredTimePassed = expiredTime <= new Date();

  return isExipredTimePassed;
}

module.exports = isVotingExpired
