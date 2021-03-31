const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");
const { addFormattedDueDate } = require("../../utils/index");

exports.renderMyVotingsPage = catchAsync(async (req, res, next) => {
  const votes = await Vote.find({ creator: req.user._id }).sort({ createdAt: 1 }).lean();

  res.locals.votes = addFormattedDueDate(votes);
  res.locals.user = req.user;
  res.render("myVotings");
});

exports.deleteVote = async (req, res, next) => {
  await Vote.deleteOne({ _id: req.params.id });

  res.redirect("/my-votings");
};
