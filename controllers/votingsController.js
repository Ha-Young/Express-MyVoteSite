const Vote = require("../models/Vote");

exports.createVotePage = (req, res) => {

  res.render("createVote");
};

exports.getVote = async (req, res) => {
  const votingId = req.params.id;
  const vote = await Vote.findById(votingId);
  const {
    isOnVote,
    title,
    creator,
    endDate,
    option
  } = vote;

  const isValidateUser = String(req.user._id) === creator;

  res.render("votings", {
    isOnVote,
    title,
    creator,
    endDate,
    option,
    isValidateUser,
    votingId
  });
};

exports.createNewVote = async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    option
  } = req.body;
  const { id } = req.user;

  const isStartDateFaster = new Date(startDate) < new Date(endDate);

  if (!isStartDateFaster) {
    res.redirect("/");

    return;
  }

  const optionListObj = option.map(title => {
    return { optionTitle: title };
  });

  try {
    await Vote.create({
      title: title,
      creator: id,
      endDate: endDate,
      option: optionListObj
    });

    res.redirect("/");
  } catch {
    res.redirect("/");
  }
};

exports.patchVoteResult = async (req, res) => {
  const userId = req.user._id;
  const voteId = req.params.id;
  const selectedOption = req.body.option;

  const vote = await Vote.findById(voteId);
  const { votedUsersId, option } = vote;
  const isUserVoted = votedUsersId.includes(userId);

  if (isUserVoted) {
    res.end();

    return;
  }

  const targetOption = option.find(optionObj => optionObj.optionTitle === selectedOption);

  targetOption.votedUsers.push(userId);
  votedUsersId.push(userId);

  vote.save();

  res.end();
};

exports.deleteVote =  async (req, res) => {
  const postId = req.params.id;

  await Vote.findByIdAndDelete(postId);

  res.end();
};
