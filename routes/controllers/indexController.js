const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");
const { addFormattedDueDate } = require("../../utils/index");

exports.renderIndexPage = catchAsync(async (req, res, next) => {
  const votes = await Vote.find()
                          .sort({ isInProgress: -1, createdAt: -1 })  // eslint-disable-line
                          .populate("creator")  // eslint-disable-line
                          .lean();  // eslint-disable-line

  res.locals.user = req.user;
  res.locals.votes = addFormattedDueDate(votes);
  res.render("index");
});
