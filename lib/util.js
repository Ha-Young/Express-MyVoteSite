exports.compareCurrentDate = (inputedDate, inputedTime) => {
  console.log(inputedDate, inputedTime)
  const mergedDateTime = inputedDate + ' ' + inputedTime;
  return new Date() < new Date(mergedDateTime);
}

exports.divideVotes = (rawVotes, userId) => {
  const ongoingVotes = [];
  const completedVotes = [];
  rawVotes.forEach((vote) => {
    if ((!userId) || userId.equals(vote.made._id)) {
      const voteInfo = {
        id: vote._id,
        title: vote.title,
        email: vote.made.email,
        expiration: vote.expiration_date.toString(),
      };
      const isOngoing = new Date() < new Date(expirationDate);
      isOngoing ? ongoingVotes.push(voteInfo) : completedVotes.push(voteInfo);
    }
  });
  return [ongoingVotes, completedVotes];
}
