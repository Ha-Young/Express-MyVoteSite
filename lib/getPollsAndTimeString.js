const Poll = require('../models/poll');

module.exports = async (myPolls) => {
  let polls = '';
  if (!myPolls) {
    polls = await Poll.find({}).populate('creator');
    if (!polls) return { polls: null, timeString: null };
  } else {
    polls = myPolls;
  }
  
  const timeString = [];
  const promises = polls.map(async (poll) => {
    timeString.push([
      poll.expiringTime.toDateString(), 
      poll.expiringTime.toLocaleTimeString(),
    ]);
    if (new Date() > new Date(poll.expiringTime)) {
      const temp = await Poll.findByIdAndUpdate(poll.id, { isInProgress: false });
      return temp;
    }
  });

  await Promise.all(promises);
  return { polls, timeString };
};
