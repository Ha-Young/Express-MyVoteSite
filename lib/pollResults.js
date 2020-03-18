module.exports = (isCreator, poll) => {
  let isExpired = false;
  let results = '';
  if (new Date() > new Date(poll.expiringTime)) {
    isExpired = true;
  }

  if (isExpired) {
    return results = poll.answers; 
  }

  if (isCreator) {
    console.log(poll.answers);
    return results = poll.answers;
  }

  return results = null;
};