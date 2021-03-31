const createError = require("http-errors");

const Vote = require("../../model/Vote");
const User = require("../../model/User");

exports.getVote = async (req, res, next) => {
  const { id: voteId } = req.params;
  const vote = await Vote
    .findById(voteId)
    .populate("creator", { user_name: 1 })
    .populate("options.voters", { user_name: 1 })
    .lean();

  const options = vote.options.map(option => {
    const voters = option.voters.map(user => {
      return {
        id: user._id.toString(),
        userName: user.user_name,
      };
    });

    return {
      id: option._id.toString(),
      title: option.title,
      voters,
    };
  });

  const creatorId = vote.creator._id.toString();
  let isCreator = null;
  let voterName = null;

  if (req.session.userId) {
    isCreator = req.session.userId.toString() === creatorId;
    voterName = (await User.findById(req.session.userId, ["user_name"]).lean()).user_name;
  }

  const renderProps = {
    voterName,
    isCreator,
    vote: {
      id: vote._id.toString(),
      title: vote.title,
      isExpired: Date.parse(vote.expire_at) < Date.now() ? true : false,
      expireAt: vote.expire_at,
      allVotingNum: options.reduce(
        (sum, option) => sum + option.voters.length,
        0,
      ),
    },
    creator: {
      id: creatorId,
      name: vote.creator.user_name,
    },
    options,
  };

  res.render("votings", renderProps);
};

exports.patchVote = async (req, res, next) => {
  const voteId = req.params.id;
  const voterId = req.session.userId;
  const voterOptions = req.body;

  const voterDoc = await User.findById(voterId);
  const hasVoted = voterDoc.votings
    .some(voting => voting.voteId.toString() === voteId);

  if (hasVoted) return res.send(400);

  const voteDoc = await Vote.findById(voteId);

  voterOptions.map(async voterOptId => {
    voteDoc.options.some((option, index) => {
      debugger;
      if (option._id.toString() === voterOptId) {
        voteDoc.options[index].voters.push(voterId);
        voteDoc.save();
        voterDoc.votings.push({ voteId, optionId: option._id });
        voterDoc.save();
        return true;
      }
    });
  });
}

exports.deleteVote = async (req, res, next) => {
  const { id: voteId } = req.params;
  try {
    await Vote.findByIdAndDelete(voteId);

    return res.send(`${voteId} is deleted.`);
  } catch (error) {
    console.error(error);
    next(createError(500, error));
  }
};