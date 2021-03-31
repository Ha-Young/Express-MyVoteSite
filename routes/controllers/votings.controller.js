const mongoose = require('mongoose');
const Vote = require('../../models/vote');
const convertDate = require('../../utils/combineDateAndTime');
const filterOption = require('../../utils/filterOption');
const classifyAccordingToIsproceeding = require('../../utils/classifyAccordingToIsproceeding');

exports.voteGetAll = async (req, res, next) => {
  const votes = await Vote.find();
  const { expiredVote, validatedVote } = await classifyAccordingToIsproceeding(votes);

  res.status(200).render('index', { expiredVote, validatedVote });
};

exports.getMyVoteList = async (req, res, next) => {
  const { id } = req.params;
  const { ObjectId } = mongoose.Types;

  const votes = await Vote.aggregate([
    {
      $match: { "creater._id": ObjectId(id) }
    }
  ]);

  const { expiredVote, validatedVote } = await classifyAccordingToIsproceeding(votes);

  res.status(200).render('myVotes', { expiredVote, validatedVote });
};

exports.voteDetail = async (req, res, next) => {
  const { id } = req.params;
  const vote = await Vote.findById(id);
  const { title, creater, expiredAt, convertedExpiredAt, isProceeding, options } = vote;

  res.status(200).render('vote', { title, creater, expiredAt, convertedExpiredAt, isProceeding, options, id });
};

exports.voteCreate = async (req, res, next) => {
  const {
    title,
    option,
    option_type: optionType,
    expired_date: expiredDate,
    expired_time: expiredTime,
  } = req.body;
  const { _id, nickname } = req.user;
  const expiredAt = expiredDate + "T" + expiredTime;
  const convertedExpiredAt = convertDate(expiredDate, expiredTime);

  if (new Date(expiredAt) < new Date()) {
    res.status(200).render('voteCreate');
    return;
  }

  await Vote.create({
    title,
    creater: {
      _id,
      nickname,
    },
    expiredAt,
    convertedExpiredAt,
    optionType,
    options: filterOption(option),
  });

  res.status(200).redirect('/');
};

exports.createSuccess = (req, res, next) => {
};

exports.createFailure = (req, res, next) => {
};

exports.voteUpdate = async (req, res, next) => {
  const { _id: user } = req.user;
  const { id } = req.params;
  const { selected } = req.body;
  const { options, participants } = await Vote.findById(id);

  for (let i = 0; i < participants.length; i++) {
    if (JSON.stringify(participants[i]) === JSON.stringify(user)) {
      res.status(200).json();
      return;
    }
  }

  const updatedOptions = options.map(option => {
    if (option.text === selected) {
      option.count = option.count + 1;
    }

    return option;
  });

  participants.push(user);
  await Vote.findByIdAndUpdate(id, { options: updatedOptions, participants }, { new: true });

  res.status(200).json();
};

exports.voteDelete = async (req, res, next) => {
  const { id } = req.params;

  await Vote.remove({ _id: id });

  res.status(200).json({ response: "delete" });
};
