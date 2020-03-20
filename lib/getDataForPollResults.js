module.exports = (isCreator, poll) => {
  let isExpired = false;
  if (new Date() > new Date(poll.expiringTime)) {
    isExpired = true;
  }

  poll.answers.sort((a, b) => {
    return b.votes - a.votes;
  });

  if (isExpired) {
    return {
      hasLoggedIn: '',
      timeString: [
        poll.expiringTime.toDateString(),
        poll.expiringTime.toLocaleTimeString(),
      ],
      displayResults: poll.answers,
      isCreator,
      poll,
    };
  }

  if (isCreator) {
    return {
      hasLoggedIn: '',
      timeString: [
        poll.expiringTime.toDateString(),
        poll.expiringTime.toLocaleTimeString(),
      ],
      displayResults: poll.answers,
      isCreator,
      poll,
    };
  }

  return {
    hasLoggedIn: '',
    timeString: [
      poll.expiringTime.toDateString(),
      poll.expiringTime.toLocaleTimeString(),
    ],
    displayResults: null,
    isCreator,
    poll,
  };
};
