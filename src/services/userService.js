const User = require("../models/User");

exports.VoteToOption = async ({ userId, voteId }) => {
  try {
    console.log('userService VoteToOption');

    const userRecord = await User.findById(userId);

    console.log('userRecord', userRecord);

    userRecord.voted_votes.push(voteId);

    console.log('vote userRecord', userRecord);

  } catch (error) {
    return { error };
  }
};
