const mongoose = require("mongoose");
const Voting = require("../../models/Voting");
const getLocalTime = require("../../utils/getLocalTime");
const getProgress = require("../../utils/getProgress");

const getVotingById = async (votingId) => {
  const voting = await Voting.findOne({ _id: votingId }).populate(
    "author",
    "name",
  );

  const startedAt = getLocalTime(voting.started_at);
  const endedAt = getLocalTime(voting.ended_at);
  const isClosed = getProgress(voting.ended_at);

  const votingInfo = {
    _id: voting._id,
    author: voting.author,
    title: voting.title,
    description: voting.description,
    votingItems: voting.voting_items,
    voters: voting.voters,
    startedAt,
    endedAt,
    isClosed,
  };

  return votingInfo;
};

module.exports = {
  getVotingById,
};
