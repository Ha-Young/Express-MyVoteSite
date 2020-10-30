/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const Vote = require('../models/Vote');
const User = require('../models/User');
const mongoose = require('mongoose');
const format = require('date-fns/format');
const {
  RESULT_MESSAGE,
  OPTION_ERROR,
  VOTE_CREATE,
  VOTE_DUPLICATED,
  VOTE_DELETED,
} = require('../constants/constants');
const {
  formatExpireDate,
  formatCreatDate,
  isExpired
} = require('../lib/helpers');

const ObjectId = mongoose.Types.ObjectId;
const nowDate = format(new Date(), 'yyyy-MM-dd');

exports.getVotingForm = (req, res, _next) => {
  res.status(200).render('votingForm', {
    result_message: req.flash(RESULT_MESSAGE),
    minDate: nowDate,
  });
};

exports.createVote = async (req, res, next) => {
  const { options, title, expirationDate } = req.body;
  const userId = req.user._id;

  if (typeof options === 'string' || options.includes('')) {
    req.flash(RESULT_MESSAGE, OPTION_ERROR);

    return res.render('votingForm', {
      result_message: req.flash(RESULT_MESSAGE),
      minDate: nowDate,
    });
  }

  const option = options.map(option => ({ desc: option }));

  try {
    const vote = new Vote({
      title: title,
      expirationDate: expirationDate,
      options: option,
      creator: userId,
    });

    const user = await User.findById(userId);

    user.myVotingList.push(ObjectId(vote._id));

    await user.save();
    await vote.save();

    req.flash(RESULT_MESSAGE, VOTE_CREATE);

    res.redirect('/votings');
  } catch (err) {
    next(err);
  }
};

exports.getVotingList = async (req, res, next) => {
  try {
    const votes = await Vote.find();

    res.render('votingList', {
      votes: votes,
      expirationDate: formatExpireDate(votes),
      createdDate: formatCreatDate(votes),
      expired: isExpired(votes),
      result_message: req.flash(RESULT_MESSAGE),
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyVoting = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('myVotingList');
    const myVotingList = user.myVotingList;

    res.render('votingList', {
      votes: myVotingList,
      expirationDate: formatExpireDate(myVotingList),
      createdDate: formatCreatDate(myVotingList),
      expired: isExpired(myVotingList),
      result_message: req.flash(RESULT_MESSAGE),
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const voteId = req.params.id;

  try {
    const vote = await Vote.findById(voteId);

    const formattedExpireDate = format(vote.expirationDate, 'yyyy/MM/dd HH:mm');
    const formattedCreateDate = format(vote.createdAt, 'yyyy/MM/dd HH:mm');
    const expiredMessage = vote => {
      return new Date() > vote.expirationDate;
    };

    let isCreator = false;

    if (req.user) {
      isCreator = req.user._id.toString() === vote.creator.toString();
    }

    res.render('votingDetail', {
      vote: vote,
      expirationDate: formattedExpireDate,
      createdDate: formattedCreateDate,
      expired: expiredMessage(vote),
      isCreator: isCreator,
      result_message: req.flash(RESULT_MESSAGE),
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOne = async (req, res, next) => {
  const voteId = req.params.id;
  const targetId = req.body.select;
  const userId = req.user._id;

  try {
    const vote = await Vote.findById(voteId);

    const targetOption = vote.options.find(option => {
      const optionId = option._id.toString();
      return optionId === targetId;
    });

    targetOption.voter.includes(userId)
      ? req.flash(RESULT_MESSAGE, VOTE_DUPLICATED)
      : targetOption.voter.push(userId);

    await vote.save();

    res.redirect(`/votings/${voteId}`);
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  const voteId = req.params.id;
  const userId = req.user._id;

  try {
    const vote = await Vote.findByIdAndDelete(voteId);
    const updateUser = await User.findById(userId);

    updateUser.myVotingList.pull(voteId);
    await updateUser.save();

    req.flash(RESULT_MESSAGE, VOTE_DELETED);

    res.json(vote);
  } catch (err) {
    next();
  }
};
