/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const Vote = require('../models/Vote');
const format = require('date-fns/format');
const User = require('../models/User');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getVotingForm = (req, res, _next) => {
  const nowDate = format(new Date(), 'yyyy-MM-dd');

  res.status(200).render('votingForm', {
    minDate: nowDate,
  });
};

exports.createVote = async (req, res, next) => {
  const { options, title, expirationDate } = req.body;
  const userId = req.user._id;
  const option = options.map(option => ({ desc: option }));

  try {
    const vote = new Vote({
      title: title,
      expirationDate: expirationDate,
      options: option,
      creator: userId,
    });

    const user = await User.findById(userId);

    user.voteCollection.push(ObjectId(vote._id));

    await user.save();
    await vote.save();

    res.redirect('/votings');
  } catch (err) {
    next(err);
  }
};

exports.getVotingList = async (req, res, next) => {
  try{
    const votes = await Vote.find();

    const formattedExpireDate = votes.map(vote => format(vote.expirationDate, 'yyyy/MM/dd HH:mm'));
    const formattedCreateDate = votes.map(vote => format(vote.createdAt, 'yyyy/MM/dd HH:mm'));

    const isExpired = votes.map(vote => {
      return new Date() > vote.expirationDate ? true : false;
    });

    res.render('votingList', {
      votes: votes,
      expirationDate: formattedExpireDate,
      createdDate: formattedCreateDate,
      expired: isExpired,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyVoting = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('voteCollection');
    const voteCollection = user.voteCollection;

    res.render('myVoting', {
      myVotings: voteCollection,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    const vote = await Vote.findById(id);

    const formattedExpireDate = format(vote.expirationDate, 'yyyy/MM/dd HH:mm');
    const formattedCreateDate = format(vote.createdAt, 'yyyy/MM/dd HH:mm');
    const expiredMessage = (vote) => {
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

    // how to update sub document in mongoose --> stack overflow
    if (!targetOption.voter.includes(userId)) {
      targetOption.voter.push(userId);
    }
    // targetOption.voter.push(userId);


    await vote.save();

    res.redirect(`/votings/${voteId}`);
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    const vote = await Vote.findByIdAndDelete(id);

    res.json(vote);
  } catch (error) {
    next();
  }
};
