function checkExpireDate(expireDate) {
  const today = new Date();
  const votingExpireDate = new Date(expireDate);
  return today <= votingExpireDate;
}

function getMaxVoterCount (votingOptions) {
  let max = 0;

  votingOptions.forEach(option => {
    if (option.voters.length > max) {
      max = option.voters.length;
    }
  });

  return max;
}

exports.checkExpireDate = checkExpireDate;
exports.getMaxVoterCount = getMaxVoterCount;
