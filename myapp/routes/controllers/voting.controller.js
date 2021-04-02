const Voting = require("../../models/Voting");
const getLocalTime = require("../../utils/getLocalTime");

const updateAndGetVotings = async () => {
  await Voting.updateMany(
    { ended_at: { $lte: new Date().getTime() } },
    { closed: true },
  );

  return await Voting.find();
};

const getVotingById = async (votingId) => {
  const voting = await Voting.findOne({ _id: votingId }).populate(
    "author",
    "name",
  );

  const startedAt = getLocalTime(voting.started_at);
  const endedAt = getLocalTime(voting.ended_at);

  const votingInfo = {
    _id: voting._id,
    author: voting.author,
    title: voting.title,
    description: voting.description,
    votingItems: voting.voting_items,
    result: voting.result,
    closed: voting.closed,
    startedAt,
    endedAt,
  };

  return votingInfo;
};

const createVoting = async (req) => {
  const userId = req.user._id;
  const { date, time, title, desc, items } = req.body;
  const isoString = date.concat("T", time);
  const votingItems = [];

  items.forEach((item) => {
    votingItems.push({ item: item, count: 0, voters: [] });
  });

  await Voting.create({
    author: userId,
    title: title,
    description: desc,
    voting_items: votingItems,
    started_at: new Date().toISOString(),
    ended_at: isoString,
  });
};

module.exports = {
  getVotingById,
  createVoting,
  updateAndGetVotings,
};
