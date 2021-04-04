function checkExpireDate(expireDate) {
  const today = new Date();
  const votingExpireDate = new Date(expireDate);
  return today <= votingExpireDate;
}

function getMaxVoterCount(votingOptions) {
  return votingOptions.reduce((acc, option) => Math.max(option.voters.length, acc), 0);
}

function getDisplayName(user) {
  return user ? user.userName : null;
}

exports.checkExpireDate = checkExpireDate;
exports.getMaxVoterCount = getMaxVoterCount;
exports.getDisplayName = getDisplayName;
