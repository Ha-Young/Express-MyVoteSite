function hasVoted(options, user) {
  for (const option of options) {
    for (const voter of option.voters) {
      if (voter.toString() === user) {
        return true;
      }
    }
  }

  return false;
}

module.exports = hasVoted;
