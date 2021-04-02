function getMaxVoterCount (votingOptions) {
  let max = 0;

  votingOptions.forEach(option => {
    if (option.voters.length > max) {
      max = option.voters.length;
    }
  });

  return max;
}

exports.getMaxVoterCount = getMaxVoterCount;
