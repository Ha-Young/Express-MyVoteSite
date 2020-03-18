module.exports = (isCreator, poll) => {
  let isExpired = false;
  let results = '';
  if (new Date() > new Date(poll.expiringTime)) {
    isExpired = true;
  }

  const answer = [];

  // console.log(poll)
  poll.answers.sort((a, b) => {
    return b.votes - a.votes;
  });

  // console.log(poll.answers, 'polls');
  if (isExpired) {
    return results = poll.answers; 
  }

  if (isCreator) {
    return results = poll.answers;
  }

  return results = null;
};