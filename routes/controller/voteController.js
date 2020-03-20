const mongoose = require("mongoose");
const Vote = require("../../models/Vote");
const User = require("../../models/User");
const { RENDER_PROPS, MESSAGE, USER_STATUS } = require("./constant");

async function createVote(req, res, next) {
  const data = req.body;
  data.options = data.options.map(item => {
    return { option: item };
  });
  data.user = req.session.user._id;
  try {
    const newVote = await Vote.create(data);
    const user = await User.findOne({ _id: req.session.user._id });
    const votes = user.votes;
    votes.push(newVote._id);
    user.votes = votes;
    const updateuser = await user.save();
  } catch (err) {
    next({ status: 500, message: MESSAGE.GET_ERROR });
  }
  res.json({ message: MESSAGE.CREATE_SUCCESS });
}

async function getAllVote(req, res, next) {
  const loginUser = req.session.userId;
  const votes = await Vote.find()
    .populate("user")
    .exec();
  votes.forEach(vote => {
    const date = vote.due.toLocaleDateString();
    const time = vote.due.toTimeString().split(" ")[0];
    vote.due = date + time;
  });
  res.render("index", { title: RENDER_PROPS.TITLE, loginUser: loginUser, votes: votes });
}

async function getUserVote(req, res, next) {
  const loginUser = req.session.userId;
  try {
    var vote = await Vote.findOne({ _id: req.params.id })
      .populate("user")
      .exec();
    var user = loginUser
      ? vote.user._id == req.session.user._id
        ? USER_STATUS.OWNER
        : USER_STATUS.USER
      : USER_STATUS.GUEST;
    var done = loginUser
      ? vote.participants.includes(mongoose.Types.ObjectId(req.session.user._id))
      : false;
  } catch (err) {
    res.render("error", { error: { status: 500, message: MESSAGE.GET_ERROR } });
  }
  res.render("vote", {
    loginUser: loginUser,
    style: RENDER_PROPS.STYLE.VOTE,
    vote: vote,
    done,
    user
  });
}

async function updateVoteCount(req, res, next) {
  if (req.session.userId) {
    var vote = await Vote.findOne({ _id: req.params.id });
    if (!vote.participants.includes(req.session.user._id)) {
      vote.options[req.body.optionId].count++;
      vote.participants.push(req.session.user._id);
      const voteUpdated = await vote.save();
      res.json({ message: MESSAGE.UPDATE_SUCCESS });
    } else {
      res.json({ message: MESSAGE.USER_DONE });
    }
  } else {
    res.json({ message: MESSAGE.UNAUTHORIZED });
  }
}

module.exports = { createVote, getAllVote, getUserVote, updateVoteCount };
