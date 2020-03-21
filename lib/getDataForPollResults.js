module.exports = (isCreator, poll) => {
  let isExpired = false;
  if (new Date() > new Date(poll.expiringTime)) {
    isExpired = true;
  }

  poll.answers.sort((a, b) => {
    return b.votes - a.votes;
  });

  return {
    hasLoggedIn: '',
    timeString: [
      poll.expiringTime.toDateString(),
      poll.expiringTime.toLocaleTimeString(),
    ],
    displayResults: (isExpired || isCreator) ? poll.answers : null,
    isCreator,
    poll,
  }
};
