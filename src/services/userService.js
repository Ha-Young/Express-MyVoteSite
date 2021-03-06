const mongoose = require("mongoose");
const User = require("../models/User");

exports.AddMyVote = async ({ userId, voteId }) => {
  try {
    const userRecord = await User.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          my_votes: mongoose.Types.ObjectId(voteId),
        },
      }
    );

    if (!userRecord) {
      throw new Error("can not find user");
    }

    return { result: true };

  } catch (error) {
    return { error };
  }
};

exports.DeleteMyVote = async ({ userId, voteId }) => {
  try {
    const userRecord = await User.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          my_votes: mongoose.Types.ObjectId(voteId),
        },
      }
    );

    if (!userRecord) {
      throw new Error("can not delete my vote");
    }

    return { result: true };

  } catch (error) {
    return { error };
  }
};

exports.CheckMyVote = async ({ userId, voteId }) => {
  try {
    const userRecord = await User.findById(userId);

    if (!userRecord) {
      throw new Error("can not find user");
    }

    const checkMyVote = userRecord.my_votes.includes(mongoose.Types.ObjectId(voteId));

    return checkMyVote ? { isMyVote: true } : { isMyVote: false };

  } catch (error) {
    return { error };
  }
};

exports.CheckAreadyVote = async ({ userId, voteId }) => {
  try {
    const userRecord = await User.findById(userId);

    if (!userRecord) {
      throw new Error("can not find user");
    }

    const checkVoteId = userRecord.voted_votes.includes(mongoose.Types.ObjectId(voteId));

    return checkVoteId ? { isAreadyVote: true } : { isAreadyVote: false };

  } catch (error) {
    return { error };
  }
};

exports.VoteToOption = async ({ userId, voteId }) => {
  try {

    const userRecord = await User.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          voted_votes: mongoose.Types.ObjectId(voteId),
        },
      }
    );

    if (!userRecord) {
      throw new Error("can not find user");
    }

    return { result: true };
  } catch (error) {
    return { error };
  }
};
