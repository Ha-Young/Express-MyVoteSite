const moment = require("moment");

const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");

exports.renderMyVotingsPage = catchAsync(async (req, res, next) => {
  const votes = await Vote.find({ creator: req.user._id }).lean();

  res.locals.votes = votes.map((vote) => {
    return {
      title: vote.title,
      dueDate: moment(vote.expiration).format("YYYY-MM-DD HH:mm"),
    };
  });
  res.locals.user = req.user;
  res.render("myVotings");
});
