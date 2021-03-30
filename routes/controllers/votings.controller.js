const Vote = require("../../model/Vote");

exports.getVote = async (req, res, next) => {
  const { id: voteId } = req.params;
  const vote = await Vote
    .findById(voteId)
    .populate("creator", { user_name: 1 })
    .populate("options.select_users", { user_name: 1 })
    .lean();

  const options = vote.options.map(option => {
    const selectUsers = option.select_users.map(user => {
      return {
        id: user._id.toString(),
        userName: user.user_name,
      };
    });

    return {
      id: option._id.toString(),
      title: option.title,
      selectUsers,
    };
  });

  const creatorId = vote.creator._id.toString();
  const isCreator = req.session.userId.toString() === creatorId;

  const renderProps = {
    isCreator,
    vote: {
      id: vote._id.toString(),
      title: vote.title,
      isExpired: Date.parse(vote.expire_at) < Date.now() ? true : false,
      expireAt: vote.expire_at,
      allVotingNum: options.reduce(
        (sum, option) => sum + option.selectUsers.length,
        0,
      ),
    },
    creator: {
      id: creatorId,
      name: vote.creator.user_name,
    },
    options,
  };
  /*
  투표가 가능하기 위해 필요한 것들,
  1. 투표 id
  2. 투표자 id
  3. 옵션 id
  */
  res.render("votings", renderProps);
};
