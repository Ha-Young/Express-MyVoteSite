const createError = require('http-errors');
const User = require('../models/User');
const Voting = require('../models/Voting');

exports.showForm = (req, res) => {
  res.render('partial/votingForm', { user: req.user });
};

exports.create = async (req, res, next) => {
  try {
    const {
      title, description, dueDate, inProgress, founder,
    } = req.body;

    const votingData = await Voting.create({
      title, description, dueDate, inProgress, founder,
    });

    if (votingData) {
      await User.updateOne(
        { _id: founder },
        { $push: { myVotings: votingData.id } },
      );

      res.redirect('/votings/success');
    } else {
      next(createError('투표 추가에 실패했습니다'));
    }
  } catch (err) {
    next(createError(err.status));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const voteData = await Voting.findById(req.params.id).exec();
    if (voteData) {
      res.render('partial/votingView', {
        user: req.user,
        data: voteData,
      });
    } else {
      next(createError('삭제 되었거나 존재하지 않는 투표입니다'));
    }
  } catch (err) {
    next(createError(err.status));
  }
};

exports.viewSuccess = (req, res, next) => {
  console.log(req.user);
  res.render('partial/message', {
    user: req.user,
    message: '투표 등록 성공!',
  });
};
