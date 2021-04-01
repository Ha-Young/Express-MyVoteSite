const User = require("../models/User");

exports.VoteToOption = async ({ userId, voteId }) => {
  try {
    console.log('userService VoteToOption');

    const userRecord = await User.findById(userId);

    if (!userRecord) {
      throw new Error("can not find user");
    }

    console.log('userRecord', userRecord);

    userRecord.voted_votes.push(voteId);

    console.log('vote userRecord', userRecord);

    userRecord.save();

    const user = userRecord.toObject();

    return { user };
  } catch (error) {
    return { error };
  }
};
