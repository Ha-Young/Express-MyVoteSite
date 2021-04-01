const { MY_VOTINGS_ROUTE } = require("../../constants");
const Vote = require("../../models/Vote");
const APIFeatures = require("../../utils/apiFeatures");
const catchAsync = require("../../utils/catchAsync");
const { addFormattedDueDate } = require("../../utils/index");

exports.renderMyVotingsPage = catchAsync(async (req, res, next) => {
  const query = Vote.find({ creator: req.user._id });
  const features = new APIFeatures(query)
    .sort();
  const votes = await features.query.lean();

  res.locals.votes = addFormattedDueDate(votes);
  res.locals.user = req.user;
  res.render("myVotings");
});

exports.deleteVote = async (req, res, next) => {
  await Vote.deleteOne({ _id: req.params.id });

  res.redirect(MY_VOTINGS_ROUTE);
};
