const createError = require('http-errors');
const Voting = require('../models/Voting');
const User = require('../models/User');

exports.getAll = async (req, res, next) => {
  try {
    const votings = await Voting.find().populate('createdBy').lean();
    res.locals.votings = votings;
    next();
  } catch (err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.getbyId = async (req, res, next) => {
  const votingId = req.params.voting_id;
  try {
    const voting = await Voting.findById(votingId).populate('createdBy').lean();
    res.locals.voting = voting;
    next();
  } catch (err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.create = async (req, res, next) => {
  const { title, endDate, endTime, options } = req.body;
  const { username } = req.user;
  try {
    const user = await User.findOne({ username });
    const expiredAt = new Date(`${endDate} ${endTime}`);

    const voting = new Voting({
      title,
      createdBy: user,
      createdAt: new Date(),
      expiredAt,
      options
    });

    res.locals.newVoting = await voting.save();
    next();
  } catch (err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.checkIsAuthor = async (req, res) => {
  res.render('votingDetail', {
    voting: res.locals.voting,
    isAuthor: res.locals.isAuthor,
    isRespondent: req.user && req.user._id === String(res.locals.voting.createdBy._id),
    selectedOption: res.locals.selectedOption
  });
};

exports.updateSelectedOption = async (req, res, next) => {
  const votingId = req.params.voting_id;
  try {
    const voting = await Voting.findById(votingId).populate('createdBy').lean();
    const { options } = voting;
    const selectedIndex = options.findIndex(i => i.option === req.body.option);

    options[selectedIndex].count++;

    await Voting.updateOne(
      { _id: votingId },
      { $set: { options } }
    );

    const updatedVoting = await Voting.findById(votingId).populate('createdBy').lean();
    res.locals.voting = updatedVoting;

    next();
  } catch (err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.updateExpired = async (req, res, next) => {
  const nowDate = new Date();
  try {
    const votings = await Voting.find().lean();

    await Promise.all(
      votings.map(async voting => {
        if (voting.expiredAt < nowDate) {
          await Voting.updateOne(
            { _id: voting._id },
            { $set: { isProceeding: false } }
          );
        }
      })
    );
    next();
  } catch (err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};
