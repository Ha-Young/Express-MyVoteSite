const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");
const APIFeatures = require("../../utils/apiFeatures");
const { addFormattedDueDate } = require("../../utils/index");

exports.renderIndexPage = catchAsync(async (req, res, next) => {
  const query = Vote.find().populate("creator");
  const features = new APIFeatures(query).sort();
  const votes = await features.query.lean();

  res.locals.user = req.user;
  res.locals.votes = addFormattedDueDate(votes);
  res.render("index");
});
