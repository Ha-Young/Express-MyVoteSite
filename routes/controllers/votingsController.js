const moment = require("moment");

const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");

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

  console.log(vote);
  res.locals.vote = vote;
  res.locals.user = req.user;
  res.render("voteDetail");
});
