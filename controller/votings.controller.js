const createError = require('http-errors');
const User = require('../models/User');
const Voting = require('../models/Voting');

exports.showForm = (req, res) => {
  res.render('partial/votingForm', { user: req.user });
};

exports.create = async (req, res, next) => {
  try {
    const {
      title, description, dueDate, founder,
    } = req.body;
    const options = [];
    req.body.options.forEach(opt => options.push({ opt, likes: [] }));

    const votingData = await Voting.create({
      title, description, dueDate, founder, options,
    });
    if (!votingData) {
      return next(createError('투표 추가에 실패했습니다'));
    }

    const updateResult = await User.updateOne(
      { _id: founder },
      { $push: { myVotings: votingData.id } },
    );
    if (!updateResult.nModified) {
      return next(createError(500, '이미 삭제되었거나 존재하지않는 투표입니다.'));
    }

    res.render('partial/message', { isSuccess: true });
  } catch (err) {
    next(createError(err.status));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const voteData = await Voting.findById(req.params.id).exec();
    if (!voteData) {
      return next(createError('삭제 되었거나 존재하지 않는 투표입니다'));
    }
    res.render('partial/votingItem', {
      user: req.user,
      data: voteData,
    });
  } catch (err) {
    next(createError(err.status));
  }
};

exports.updateVoting = async (req, res, next) => {
  try {
    const voting = await Voting.findOne({ _id: req.params.id });
    if (!voting) {
      return res.send(false);
    }

    voting.participants.push(req.user.id);
    voting.options.id(req.body.id).likes.push(req.user.id);

    const result = await voting.save();
    return res.send(!!result);
  } catch (err) {
    return next(createError(err.status));
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const deleteResult = await Voting.deleteOne({ _id: req.params.id });
    if (!deleteResult.deletedCount) {
      return next(createError(500, '이미 삭제되었거나 존재하지않는 투표입니다.'));
    }
    const updateResult = await User.updateOne(
      { _id: req.user.id },
      { $pull: { myVotings: req.params.id } },
    );

    if (!updateResult.nModified) {
      return next(createError(500, '이미 삭제되었거나 존재하지않는 투표입니다.'));
    }

    return res.redirect('/');
  } catch (err) {
    return next(createError(err.status));
  }
};
