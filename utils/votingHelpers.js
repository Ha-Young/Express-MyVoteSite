function checkExpireDate(expireDate) {
  const today = new Date();
  const votingExpireDate = new Date(expireDate);
  return today <= votingExpireDate;
}

function getMaxVoterCount(votingOptions) {
  return votingOptions.reduce((acc, option) => Math.max(option.voters.length, acc), 0);
}

exports.checkExpireDate = checkExpireDate;
exports.getMaxVoterCount = getMaxVoterCount;
