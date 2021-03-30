const moment = require("moment");
const mongoose = require("mongoose");

const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");
const { addFormattedDueDate } = require("../../utils/index");
const AppError = require("../../utils/AppError");

exports.renderVotingsPage = (req, res, next) => {
  res.locals.message = req.flash("message")[0] || null;
  res.locals.user = req.user;
  res.render("createVoting");
};

exports.createVote = catchAsync(async (req, res, next) => {
  const { title, expiration } = req.body;

  if (!title || !expiration) {
    req.flash("message", "Provide title and expiration.");
    res.redirect("/votings/new");
    return;
  }

  if (expiration < moment().format()) {
    req.flash("message", "A expiration date must be after now.");
    res.redirect("/votings/new");
    return;
  }

  await Vote.create({
    title: req.body.title,
    creator: req.user._id,
    expiration: moment(req.body.expiration).format(),
    createdAt: moment().format(),
  });

  res.redirect("/my-votings");
});

exports.renderVoteDetailPage = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(new AppError("Not Found Page", 404));
    return;
  }

  const vote = await Vote.findById(id).populate("creator").lean();

  if (!vote) {
    res.redirect("/");
    return;
  }

  res.locals.vote = addFormattedDueDate(vote);
  res.locals.user = req.user;
  res.locals.isCreator = req.user?._id.equals(vote.creator._id);
  res.render("voteDetail");
});

exports.deleteVote = async (req, res, next) => {
  await Vote.deleteOne({ _id: req.params.id });

  res.redirect("/");
};

exports.voting = async (req, res, next) => {

};
