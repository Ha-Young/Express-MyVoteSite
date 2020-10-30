function isVotingExpired(expiredTime) {
  return expiredTime <= new Date();
}

module.exports = isVotingExpired;
