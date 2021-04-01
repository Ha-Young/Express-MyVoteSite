const moment = require("moment");
const mongoose = require("mongoose");

const Vote = require("../../models/Vote");
const catchAsync = require("../../utils/catchAsync");
const { addFormattedDueDate, extractOptions } = require("../../utils/index");
const AppError = require("../../utils/AppError");
const {
  NEW,
  VOTINGS_ROUTE,
  MY_VOTINGS_ROUTE,
  ROOT_ROUTE,
} = require("../../constants");

exports.renderVotingsPage = (req, res, next) => {
  res.locals.message = req.flash("message")[0] || null;
  res.locals.user = req.user;
  res.render("createVoting");
};

exports.createVote = catchAsync(async (req, res, next) => {
  const { title, expiration } = req.body;
  const options = extractOptions(req);

  if (options.length < 2) {
    req.flash("message", "Provide options more than Two.");
    res.redirect(VOTINGS_ROUTE + NEW);
  }

  if (!title || !expiration) {
    req.flash("message", "Provide title and expiration.");
    res.redirect(VOTINGS_ROUTE + NEW);
    return;
  }

  if (expiration < moment().format()) {
    req.flash("message", "A expiration date must be after now.");
    res.redirect(VOTINGS_ROUTE + NEW);
    return;
  }

  await Vote.create({
    title: req.body.title,
    creator: req.user._id,
    options,
    expiration: moment(req.body.expiration).format(),
    createdAt: moment().format(),
  });

  res.redirect(MY_VOTINGS_ROUTE);
});

exports.renderVoteDetailPage = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(new AppError("Not Found Page", 404));
    return;
  }

  // 인덴팅을 어떻게 하는 것이 컨벤션인지 모르겠습니다 ㅠㅠㅠㅠ
  const vote = await Vote
    .findById(id)
    .populate("creator")
    .populate("voters")
    .lean();

  if (!vote) {
    res.redirect(ROOT_ROUTE);
    return;
  }

  res.locals.isVoted = vote.voters.some((voter) => voter._id.equals(req.user?._id));
  res.locals.isCreator = req.user?._id.equals(vote.creator?._id);
  res.locals.vote = addFormattedDueDate(vote);
  res.locals.user = req.user;
  res.render("voteDetail");
});

exports.deleteVote = async (req, res, next) => {
  await Vote.deleteOne({ _id: req.params.id });

  res.redirect(ROOT_ROUTE);
};

exports.voting = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { votedId } = req.body;

  await Vote.updateOne(
    {
      _id: id,
      "options.$._id": votedId,
    },
    {
      $push: {
        voters: req.user._id,
        "options.$.voters": req.user._id,
      },
    },
  );

  res.redirect(`${VOTINGS_ROUTE}/${id}`);
});

exports.sendVoteDetails = catchAsync(async (req, res, next) => {
});
