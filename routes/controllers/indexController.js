const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");

exports.renderIndexPage = catchAsync(async (req, res, next) => {
  const votes = await Vote.find().lean();

  res.locals.votes = votes;
  res.render("index");
});
