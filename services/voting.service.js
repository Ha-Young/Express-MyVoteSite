const User = require('../models/User');
const Voting = require('../models/Voting');
const { dbErrorMessage } = require('../constants');
const { calculateDate } = require('../utils');
const {
  DB_ERROR_CREATING_VOTING,
  DB_ERROR_READING_VOTING,
  DB_ERROR_READING_VOTERS,
  DB_ERROR_UPDATING_COUNT,
  DB_ERROR_UPDATING_VOTERS,
  DB_ERROR_DELETING_VOTING,
  DB_ERROR_DELETING_USER_VOTINGS,
} = dbErrorMessage;

exports.createNewVoting = async votingInfo => {
  try {
    const newVoting = await Voting.create(votingInfo);
    return newVoting;
  } catch (error) {
    throw new Error(DB_ERROR_CREATING_VOTING + error);
  }
};

exports.updateUserVotings = async (userId, voting) => {
  try {
    // voting._id 이상 없는지 재차 확인
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { myVotings: voting._id } }
    );
  } catch (error) {
    throw new Error(DB_ERROR_UPDATING_USER_VOTINGS + error);
  }
};

exports.getTargetVoting = async (votingId) => {
  try {
    const targetVoting = await Voting.findById(votingId).populate('writer').lean();
    targetVoting.dueDate = calculateDate(targetVoting.dueDate);
    return targetVoting;
  } catch (error) {
    throw new Error(DB_ERROR_READING_VOTING + error);
  }
};

exports.checkAlreadyVoted = async (votingId, userId) => {
  try {
    const votedUsers = await Voting.findById(votingId, 'voter');
    return votedUsers.voter.includes(userId);
  } catch (error) {
    throw new Error(DB_ERROR_READING_VOTERS + error);
  }
};

exports.updateVotedCount = async (optionId, userId) => {
  try {
    await Voting.findOneAndUpdate(
      { 'options._id': optionId },
      { $addToSet: { 'options.$[option].votedCount': userId } },
      { arrayFilters: [{ 'option._id': optionId }] },
    );
  } catch (error) {
    throw new Error(DB_ERROR_UPDATING_COUNT + error);
  }
};

exports.updateTotalVoters = async (votingId, userId) => {
  try {
    await Voting.findByIdAndUpdate(
      votingId,
      { $addToSet: { voter: userId } }
    );
  } catch (error) {
    throw new Error(DB_ERROR_UPDATING_VOTERS + error);
  }
};

exports.deleteUserVotings = async (votingId) => {
  try {
    await User.update(
      { 'myVotings': votingId },
      { $pull: { 'myVotings': votingId } },
    );
  } catch (error) {
    throw new Error(DB_ERROR_DELETING_USER_VOTINGS + error);
  }
};

exports.deleteVoting = async (votingId) => {
  try {
    await Voting.findOneAndDelete(votingId);
  } catch (error) {
    throw new Error(DB_ERROR_DELETING_VOTING + error);
  }
};
