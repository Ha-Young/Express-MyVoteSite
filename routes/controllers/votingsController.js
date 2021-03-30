const moment = require("moment");

const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");
const { addFormattedDueDate } = require("../../utils/index");

exports.renderVotingsPage = (req, res, next) => {
  res.locals.user = req.user;
  res.render("createVoting");
};

exports.createVote = catchAsync(async (req, res, next) => {
  await Vote.create({
    title: req.body.title,
    creator: req.user._id,
    expiration: moment(req.body.expiration).format(),
    createdAt: moment().format(),
  });

  res.redirect("/my-votings");
});

exports.renderVoteDetailPage = catchAsync(async (req, res, next) => {
  const vote = await Vote.findById(req.params.id).populate("creator").lean();

  res.locals.vote = addFormattedDueDate(vote);
  res.locals.user = req.user;
  res.locals.isCreator = req.user._id.equals(vote.creator._id);
  res.render("voteDetail");
});

exports.deleteVote = async (req, res, next) => {
  await Vote.deleteOne({ _id: req.params.id });

  res.redirect("/");
};
