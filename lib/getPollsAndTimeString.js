const Poll = require('../models/poll');

module.exports = async (polls) => {
  if (!polls) {
    polls = await Poll.find({}).populate('creator');
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
