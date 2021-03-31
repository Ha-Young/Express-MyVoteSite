const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");
const { addFormattedDueDate } = require("../../utils/index");

exports.renderIndexPage = catchAsync(async (req, res, next) => {
  const votes = await Vote.find().populate("creator").sort({ createdAt: 1 }).lean();

  res.locals.user = req.user;
  res.locals.votes = addFormattedDueDate(votes);
  res.render("index");
});
