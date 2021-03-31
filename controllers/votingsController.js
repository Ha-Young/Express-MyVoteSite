const Vote = require("../models/Vote");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.createVotePage = (req, res) => {
  res.render("createVote");
};

exports.getVote = async (req, res) => {
  const token = req.cookies["access_token"];
  let decoded = null;
  let user = null;
  let isValidateUser = false;

  const votingId = req.params.id;
  const vote = await Vote.findById(votingId);
  const {
    isOnVote,
    title,
    creator,
    endDate,
    option
  } = vote;

  if (token) {
    decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    user = await User.findById(decoded.id);
    isValidateUser = String(user._id) === creator;
  }

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
  const token = req.cookies["access_token"];
  const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
  const user = await User.findById(decoded.id);

  const userId = user._id;
  const voteId = req.params.id;
  const selectedOption = req.body.option;

  const vote = await Vote.findById(voteId);
  const { votedUsersId, option } = vote;
  const isUserVoted = votedUsersId.includes(userId);

  if (isUserVoted) {
    res.send(400);

    return;
  }

  const targetOption = option.find(optionObj => optionObj.optionTitle === selectedOption);

  targetOption.votedUsers.push(userId);
  votedUsersId.push(userId);

  vote.save();

  res.json({ vote });
};

exports.deleteVote =  async (req, res) => {
  const postId = req.params.id;

  await Vote.findByIdAndDelete(postId);

  res.end();
};
